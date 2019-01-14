import 'reflect-metadata';
import { getDebugger } from '@microgamma/loggator';

const d = getDebugger('microgamma:entity.decorator');

const EntityMetadata = Symbol('Entity');

export interface EntityOptions {
  readonly name: string;
  readonly uri: string;
}

export function Entity(options: EntityOptions) {

  return (target) => {

    return Reflect.metadata(EntityMetadata, options)(target);

  };
}

export function getEntityMetadata(instance) {
  return Reflect.getMetadata(EntityMetadata, instance.constructor);
}
