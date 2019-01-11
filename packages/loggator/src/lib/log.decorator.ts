import debug, { IDebugger } from 'debug';
import 'reflect-metadata';


export const debuggerMetadata = Symbol('debug');
let namespace;
const d = debug;

export function Log(subspace?: string) {

  return (target, propertyKey) => {

    Reflect.defineMetadata(debuggerMetadata, subspace || target.constructor.name, target);


    target[propertyKey] = {
      d: (...args) => {

        subspace = subspace || target.constructor.name;

        const ns = namespace ? [namespace, subspace].join(':') : subspace;

        const loggerFn: IDebugger = getDebugger(ns);

        return loggerFn.apply(null, args);
      }
    };
  }
}

export function setNamespace(ns: string) {
  namespace = ns;
}

export function getDebugger(ns: string): IDebugger {
  const de = d(ns);
  de['useColors'] = true;
  return de;
}