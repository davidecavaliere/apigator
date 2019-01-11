// tslint:disable:no-expression-statement no-object-mutation
import test from 'ava';
import { bootstrap } from '../index';
import { getPathParameterMetadata, PathParameter } from './path-parameter.decorator';
import { Endpoint, Lambda, LambdaOptions } from '../..';

const option1: LambdaOptions = {
  method: 'get',
  name: 'lambda-name-1',
  path: '/'
};

const option2: LambdaOptions = {
  method: 'get',
  name: 'lambda-name-2',
  path: ':id'
};

@Endpoint({
  name: 'endpoint'
})
class TestClass {
  public readonly toTestAccessToInstance: string = 'base';

  @Lambda(option1)
  public findAll(@PathParameter() arg1, arg2, arg3) {
    // console.log('running original findAll()');
    return this.toTestAccessToInstance + arg1 + arg2 + arg3;
  }

  @Lambda(option2)
  public findOne() {
    return 1;
  }
}

let instance: TestClass;

test.beforeEach(() => {
  instance = bootstrap(TestClass);
});

test('path parameter decorator', t => {
  // console.log('instance', instance);
  t.is(instance instanceof TestClass, true);
});

test('should store some metadata', t => {
  t.deepEqual(getPathParameterMetadata(instance, 'findAll'), []);
});
