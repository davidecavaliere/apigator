import 'reflect-metadata';

export const testMetadata = Symbol('test');

export interface TestOptions {
  [key: string]: any;
}

export function Test(options?: TestOptions){

  const TestDecorator = <TFunction extends { new (...args) }>(target) => {
    Reflect.defineMetadata(testMetadata, options, target);

    // return class extends target {
    //   private __getMetadata() {
    //     return Reflect.getMetadata(testMetadata, this);
    //   }
    // }

  };

  return TestDecorator;
}

export function getTestMetadata(instance) {
  return Reflect.getMetadata(testMetadata, instance.constructor)
}
