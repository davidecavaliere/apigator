// tslint:disable: no-object-mutation no-if-statement readonly-array no-mixed-interface

import { getInjectable } from './injectable.decorator';
import { getDebugger } from '@microgamma/loggator';

const d = getDebugger('microgamma:di:inject');

const singletons: { [className: string]: any } = {};


export function Inject(classDef): PropertyDecorator {
  return <TFunction extends Function>(target: TFunction, propertyKey) => {

    d('injecting on', target, classDef.name);


    d('typeof', propertyKey);
    d(classDef);
    const constructor = getInjectable(classDef);
    d('got constructor', constructor.name);

    if (!singletons[constructor.name]) {
      d( `${constructor.name} singleton not found. creating....`);
      singletons[constructor.name] = new constructor();
    }

    target[propertyKey] = singletons[constructor.name];

  }
}