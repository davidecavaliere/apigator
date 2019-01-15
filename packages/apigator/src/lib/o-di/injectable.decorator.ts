// tslint:disable: no-object-mutation no-if-statement readonly-array no-mixed-interface
import 'reflect-metadata';
import { getDebugger } from '@microgamma/loggator';
import { Constructor } from '@microgamma/apigator';

const d = getDebugger('microgamma:di:injectable');



const injectables: { [className: string]: Constructor } = {};

const InjectableMetadata = Symbol('Injectable');

export interface InjectableOptions {
  [k: string]: any
}

export function Injectable(options?: InjectableOptions) {
  // console.log('constructing a class decorator', options)
  return <TFunction extends Constructor>(target: TFunction) => {
    d('injecting class', target.name);

    injectables[target.name] = target;
    Reflect.metadata(InjectableMetadata, options)(target);
  };
}



export function getInjectableMetadata(instance) {
  return Reflect.getMetadata(InjectableMetadata, instance.constructor);
}

export function getInjectable(className: string | Function): Constructor {
  const name = className instanceof Function ? className.name : className;

  d('getting constructor for', name);
  if (!injectables[name]) {
    throw Error(`${className} is not available for injection. Did you forget to annotate it with @Injectable?`);
  }

  return injectables[name];
}
