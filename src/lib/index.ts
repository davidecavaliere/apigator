// tslint:disable no-object-mutation

import { getDebugger } from '@microgamma/ts-debug/build/main/lib/log.decorator';

const d = getDebugger('microgamma:apigator:index');

const singletons = {};

export function boostrap(classDef: any, engine: string) {
  const inst = new classDef();

  d('storing singleton', classDef.name);
  singletons[classDef.name] = inst;

  return inst;
}

export function bootstrapExpress(classDef: any, app: any) {
  const inst = new classDef();

  singletons[classDef.name] = inst;

  return inst;
}

export function getSingleton(className: string) {
  d(`getting singleton ${className}`);
  return singletons[className] || null;
}
