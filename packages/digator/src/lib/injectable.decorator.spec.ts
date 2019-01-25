// tslint:disable:no-expression-statement no-object-mutation max-classes-per-file

import { getInjectable, getInjectableMetadata, getInjectables, getSingletons, Inject, Injectable } from './';
import { getDebugger } from '@microgamma/loggator';
import any = jasmine.any;
import anything = jasmine.anything;

const d = getDebugger('microgamma:inject:decorator:spec');

@Injectable()
class TestClassA {}

@Injectable()
class TestClassB {}

describe('@Injectable', () => {

  it('should make injectables avaible for injection', () => {
    expect(getInjectable(TestClassA)).toEqual(TestClassA);
    expect(getInjectable(TestClassB)).toEqual(TestClassB);
  });

  it('injectables should not be instantiated yet', () => {
    expect(getSingletons()).toEqual({});
  });

  it('should get injectable metadata', () => {
    expect(getInjectableMetadata(TestClassA)).toBeUndefined();
  });

  it('should throw an error if injectable cannot be found', () => {

    try {
      getInjectable(class AClass {});
    } catch (e) {
      expect(e.message).toContain('AClass');
    }

  });

  it('should get all the injectables available', () => {
    expect(getInjectables()).toEqual({
      TestClassA: anything(),
      TestClassB: anything()
    });

  });

});
