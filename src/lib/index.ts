// tslint:disable no-object-mutation

const singletons = {};

export function boostrap(classDef: any, engine: string) {
  const inst = new classDef();

  singletons[classDef.name] = inst;

  return inst;
}

export function bootstrapExpress(classDef: any, app: any) {
  const inst = new classDef();

  singletons[classDef.name] = inst;

  return inst;
}

export function getSingleton(className: string) {
  return singletons[className] || null;
}
