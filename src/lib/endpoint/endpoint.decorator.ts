// tslint:disable:only-arrow-functions readonly-array prefer- no-if-statement no-object-mutation no-this

import debug from 'debug';
import 'reflect-metadata';
import { getSingleton } from '../index';

const d = debug('lambda:endpoint');

export const EndpointMetadata = Symbol('Endpoint');

export interface EndpointOptions {
  name?: string;
  readonly path: string;
  readonly method: string;
}

export function Endpoint(options: EndpointOptions) {
  d('constructing a class decorator', options);
  return (target: any, key: string, descriptor) => {
    d('decorating method');
    d(target);
    d(key);
    d(descriptor);

    options.name = options.name || key;

    const endpoints = getEndpointMetadata(target).concat(options);
    // d('endpoints: ', endpoints);

    Reflect.defineMetadata(EndpointMetadata, endpoints, target);

    const originalFunction = descriptor.value;
    d('original function is', originalFunction);

    // how actual are rappresented depends on the
    // real framework that is being used to ran the function
    descriptor.value = (...args: any[]) => {
      return new Promise((resolve, reject) => {
        const originalArgs = annotate(originalFunction);
        d('original args are: ', originalArgs);

        d('actual args are: ', args);

        const instance = getSingleton(target.constructor.name);
        d('current instance is:', instance);
        /*
            At this point args is an array
            I.E.:
             - if running on express then this array would contain [req, res, nex]
             - if running on AWS lambda would be [event, context, cb]
            and so on
         */
        // TODO: here we need to handle arguments extrapolation
        // from the original function and map

        const newArgs = originalArgs.map(arg => {
          d('parsing', arg);
          if (!args[0][arg]) {
            reject(`argument <${arg}> not found `);
          }
          return args[0][arg];
        });

        // this will work only for aws lambdas
        // const event = args[0];
        const context = args[1];

        // Make sure to add this so you can re-use `conn` between function calls.
        // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
        context.callbackWaitsForEmptyEventLoop = false;
        d('context is', context);


        const cb = args[2];
        d('callback is', cb);
        d('-----------------');
        const retValue = originalFunction.apply(instance, newArgs);

        d('retValue', retValue);
        d('retValue is promise', retValue instanceof Promise);
        if (retValue instanceof Promise) {
          d('wait for promise to resolve');
          retValue.then((res) => {
            d('promise resolved with', res);
            cb(null, res);
          }).catch((err) => {
            d('promise rejected', err);
            if (err === 'not found') {
              context.status(404);
            } else {
              context.status(500);
            }
            cb(null, err);
          });
        } else {

          cb(null, retValue);
        }
        resolve(retValue);
      });
    };

    return descriptor;
  };
}

export function getEndpointMetadata(instance) {
  const metadata = Reflect.getMetadata(EndpointMetadata, instance);
  d('metadata', metadata);
  return metadata ? [].concat(metadata) : [];
}

const FN_ARGS = /^[a-zA_Z]\s*[^\(]*\(\s*([^\)]*)\)/m;
const FN_ARG_SPLIT = /,/;
const FN_ARG = /^\s*(_?)(.+?)\1\s*$/;
const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;

/**
 * Returns an array of arguments' name of the given function
 *
 * I.E.:
 * function test(arg1, arg2, arg3) { }
 *
 * const args = annotate(fn);
 * d(args);
 *
 * // ['arg1', 'arg2', 'arg3']
 *
 * @param fn
 * @returns {string[]}
 */
function annotate(fn: (...args) => any) {
  const $inject: string[] = [];
  let fnText;
  let argDecl;

  if (typeof fn === 'function') {
    fnText = fn.toString().replace(STRIP_COMMENTS, '');
    d(fnText);
    argDecl = fnText.match(FN_ARGS);
    argDecl[1].split(FN_ARG_SPLIT).forEach(function(arg: any) {
      arg.replace(FN_ARG, function(all: any, underscore: any, name: any) {
        // d(all, underscore);
        $inject.push(name);
      });
    });
  } else {
    throw Error('fn is not a function');
  }

  return $inject;
}
