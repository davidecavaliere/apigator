// tslint:disable: no-object-mutation no-if-statement readonly-array no-mixed-interface object-literal-shorthand only-arrow-functions

import { getInjectable, getInjectables } from './';
import { getDebugger } from '@microgamma/loggator';

const d = getDebugger('microgamma:di:inject');

const singletons: { [className: string]: any } = {};


export function Inject(classDef): PropertyDecorator {
  return <TFunction extends Function>(target: TFunction, propertyKey) => {

    // lazy injection of the singleton when it's needed
    Object.defineProperty(target, propertyKey, {
      get: () => {

        d('injectables are', getInjectables());

        const constructor = getInjectable(classDef);
        d('got constructor', constructor.name);
        if (!singletons[constructor.name]) {
          d( `${constructor.name} singleton not found. creating....`);
          singletons[constructor.name] = new constructor();
        }
        //
        return singletons[constructor.name];
      }
    });




  }
}

export function getSingletons() {
  return singletons;
}