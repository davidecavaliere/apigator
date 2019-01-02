// tslint:disable no-object-mutation

import { getDebugger } from '@microgamma/ts-debug/build/main/lib/log.decorator';

const d = getDebugger('microgamma:apigator:index');

const singletons = {};

export function bootstrap(classDef: any) {
  const inst = new classDef();

  d('storing singleton', classDef.name);
  singletons[classDef.name] = inst;

  return inst;
}


export function getSingleton(className: string) {
  d(`getting singleton ${className}`);
  return singletons[className] || null;
}

export function serve(classDef) {

}
