// tslint:disable:only-arrow-functions readonly-array prefer- no-if-statement no-object-mutation no-this

import 'reflect-metadata';
import { getArguments } from '../utils';
import { APIGatewayEvent } from 'aws-lambda';
import { getDebugger } from '@microgamma/loggator';

const d = getDebugger('microgamma:apigator:permission');

export const PermissionMetadata = Symbol('Permission');

export interface PermissionOptions {
  allow: (...args: any[]) => PromiseLike<any>;
}

function getApiGatewayEvent(args): APIGatewayEvent {
  // TODO add check
  return args[0];
}

function extractBody(args: any[]) {

  return getApiGatewayEvent(args).body;
}

function extractPathParams(args: any[]) {
  return getApiGatewayEvent(args).path;
}

function extractHeaderParams(args: any[]) {
  return getApiGatewayEvent(args).headers;
}

export function Permission(options: PermissionOptions): MethodDecorator {


  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    // d('target', target);
    // d('function name', key);

    const permissions = getPermissionMetadata(target).concat(options);

    Reflect.defineMetadata(PermissionMetadata, permissions, target);


    const originalMethod = descriptor.value;
    d('original method', originalMethod);
    const originalArguments = getArguments(originalMethod);
    d('original arguments', originalArguments);

    d('allow arguments are ', getArguments(options.allow));
    descriptor.value = function() {
      // d('this is', this);
      d('arguments are', arguments);
    };

    return descriptor;
  };
}

export function getPermissionMetadata(instance) {
  const metadata = Reflect.getMetadata(PermissionMetadata, instance);
  return metadata ? [].concat(metadata) : [];
}

export function getPermissionMetadataFromClass(klass) {
  const metadata = Reflect.getMetadata(PermissionMetadata, klass.prototype);
  return metadata ? [].concat(metadata) : [];
}
