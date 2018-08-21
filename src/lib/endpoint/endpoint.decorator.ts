// tslint:disable:only-arrow-functions readonly-array prefer- no-if-statement no-object-mutation no-this

import debug from 'debug';
import 'reflect-metadata';
import { getSingleton } from '../index';
import { APIGatewayEvent } from '@types/aws-lambda';

const d = debug('microgamma:apigator:endpoint');

export const EndpointMetadata = 'Endpoint';

export interface EndpointOptions {
  name?: string;
  path: string;
  method: string;
  integration?: string; // TODO Enum will all possible values of serverless integeration
}

function getApiGatewayEvent(args): APIGatewayEvent {
  const awsLambdaEvent: APIGatewayEvent = args[0];

  if (!awsLambdaEvent) {
    throw new Error('extracting path params');
  }

  return awsLambdaEvent
}

function extractBody(args: any[]) {

  return getApiGatewayEvent(args).body;
}

function extractPathParams(args: any[]) {
  return getApiGatewayEvent(args).path;
}

export function Endpoint(options: EndpointOptions) {
  d('constructing a class decorator', options);
  return (target: any, key: string, descriptor) => {
    d('decorating method');
    d('target', target);
    d('function name', key);
    d('descriptor', descriptor);

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
        const functionArgumentsNames = extractArguments(originalFunction);
        // here we have an array of string with names of arguments.
        /*
          i.e.: if function is defined such as:

          public function(id) {
          }

          then here we have ['id']

         */
        d('functionArgumentsNames ', functionArgumentsNames);

        /*
        here we have the real args the function has been called with
        i.e.: in case of aws lambda; respectively event, context, cb

        [
          { id: '5b798b78a56340b78834026f' },
          { awsRequestId: 'id',
            invokeid: 'id',
            logGroupName: '/aws/lambda/microgamma-user-service--findById',
            logStreamName: '2015/09/22/[HEAD]13370a84ca4ed8b77c427af260',
            functionVersion: 'HEAD',
            isDefaultFunctionVersion: true,
            functionName: 'microgamma-user-service--findById',
            memoryLimitInMB: '1024',
            succeed: [Function: succeed],
            fail: [Function: fail],
            done: [Function: done],
            getRemainingTimeInMillis: [Function: getRemainingTimeInMillis] },
          [Function: callback] ]

         */
        d('actual args are: ', args);

        const instance = getSingleton(target.constructor.name);
        d('current instance is:', instance);

        const methodMetadata = getEndpointMetadata(instance);
        d('method metadata', methodMetadata);


        /*
            At this point args is an array
            I.E.:
             - if running on AWS lambda would be [event, context, cb]
            and so on
         */

        // extract body
        const body = extractBody(args);
        d('body is', body);

        // extract path params
        const pathParams = extractPathParams(args);
        d('path params are', pathParams);

        // extract query params
        // TBD

        // being able to alter the context
        // TBD

        // Make sure to add this so you can re-use `conn` between function calls.
        // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
        args[1].callbackWaitsForEmptyEventLoop = false;


        // here we need to extract the values we're expecting as arguments of our function from the real argument passed.
        const newArgs = functionArgumentsNames.map((arg) => {
          d('arg is', arg);
          return pathParams[arg] || body[arg] || `argument ${arg} not found`;
        });
        d('mapped args are', newArgs);


        const cb = args[2];
        d('callback is', cb);
        d('-----------------');
        const retValue = originalFunction.apply(instance, newArgs);

        d('retValue', retValue);

        if (retValue instanceof Promise) {
          d('wait for promise to resolve');
          retValue.then((res) => {

            d('promise resolved with', res);
            cb(null, res);

          }).catch((err) => {

            d('promise rejected', err);

            // if (err === 'not found') {
            //
            //   if (typeof context.status === 'function') {
            //     // context is expressjs res object
            //     context.status(404);
            //   } else if (context.hasOwnProperty('statusCode')) {
            //     // this is a aws lambda
            //     context.statusCode = 404;
            //   }
            // } else {
            //   // same as above
            //   if (typeof context.status === 'function') {
            //     context.status(500);
            //   } else if (context.hasOwnProperty('statusCode')) {
            //     context.statusCode = 500;
            //   }
            // }

            cb(new Error(`[500] ${err}`));
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

export type FunctionArg = string;


/**
 * Returns an array of arguments' name of the given function
 *
 * I.E.:
 * function test(arg1, arg2, arg3) { }
 *
 * const args = extractArguments(fn);
 * d(args);
 *
 * // ['arg1', 'arg2', 'arg3']
 *
 * @param fn
 * @returns {string[]}
 */
function extractArguments(fn: (...args) => any): FunctionArg[] {

  const FN_ARGS = /^[a-zA_Z]\s*[^\(]*\(\s*([^\)]*)\)/m;
  const FN_ARG_SPLIT = /,/;
  const FN_ARG = /^\s*(_?)(.+?)\1\s*$/;
  const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;


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

/**
 *
 * @param event AWS event. I want to be a more generic type
 */
function mapArguments(event, body: string, pathParams: string) {

  // originalArgs.map(arg => {
  //   d('parsing', arg);
  //
  //
  //   // args[0] is the event when running on aws lambda
  //   const event = args[0];
  //
  //   if (methodMetadata['method'] === 'get') {
  //
  //     if (!event.path && !event.path[arg]) {
  //       reject(`argument <${arg}> not found `);
  //     }
  //
  //   } else {
  //
  //     if (!event[arg]) {
  //       reject(`argument <${arg}> not found `);
  //     }
  //
  //   }
  //
  //   // if arg shall be found as a path parameter on aws lambda we'll need
  //   // to check the event.path[arg]
  //
  //   // with the following we'll get the arg from the body if any
  //   return args[0][arg];
  // });
}