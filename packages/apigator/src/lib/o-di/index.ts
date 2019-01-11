import { getDebugger } from '@microgamma/ts-debug';
import { ReplaySubject } from 'rxjs';

const d = getDebugger('o-injectable');

export namespace ODI {

  const injectables: {
    [klassName: string]: {
      constructor: Constructor
      instance?: Object
    }
  } = {};

  const injectables$: ReplaySubject<any> = new ReplaySubject<any>();

  export interface Constructor {
    /**
     * Creates a new function.
     * @param args A list of arguments the function accepts.
     */
    new(...args: string[]): any;
  }

  export function Injetable(target) {
    d(`making ${target.name} injectable`);

    injectables[target.name] = {
      constructor: target
    };
    // Reflect.metadata(InjectableMetadata, options)(target);
  }


  export function Inject(classDef): PropertyDecorator {
    return <TFunction extends Function>(target: TFunction, propertyKey) => {

      let instance;

      d(`injecting ${classDef.name} on ${target.constructor.name}`);

      // check wheter an instance of this class has already been created
      if (!injectables[classDef.name].instance) {
        const constructor = injectables[classDef.name].constructor;
        injectables[classDef.name].instance = new constructor();
      }

      instance = injectables[classDef.name].instance;
      classDef.prototype[propertyKey] = instance;
    }
  }

}
