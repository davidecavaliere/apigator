import { getSingleton } from '@microgamma/digator';

export function bootstrap(classDef: any) {
  return getSingleton(classDef);
}

