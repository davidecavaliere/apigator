// tslint:disable:only-arrow-functions readonly-array prefer- no-if-statement no-object-mutation no-this

import debug from 'debug';
import 'reflect-metadata';

const d = debug('microgamma:apigator:path-parameter');

export const PathParameterMetadata = 'PathParameter';

export interface PathParameterOptions {
  name?: string;
}

export function PathParameter(options?: PathParameterOptions): ParameterDecorator {
  d('constructing path parameter with options:', options);
  return (target: any, key: string, index) => {
    d('target', target);
    d('key', key);
    d('index', index);
    
    Reflect.defineMetadata(PathParameterMetadata, options || index, target, key);
  };
}

export function getPathParameterMetadata(instance, key) {
  const metadata = Reflect.getMetadata(PathParameterMetadata, instance, key);
  d('metadata', metadata);
  return metadata ? [].concat(metadata) : [];
}
