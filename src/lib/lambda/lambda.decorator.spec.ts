// tslint:disable:no-expression-statement no-object-mutation
import test from 'ava';
import { getLambdaMetadata, Lambda, LambdaOptions } from './lambda.decorator';
import { Endpoint } from '../../';
import { bootstrap } from '../index';

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
  public findAll(arg1, arg2, arg3) {
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

test('lambda decorator', t => {
  // console.log('instance', instance);
  t.is(instance instanceof TestClass, true);
});

test('should store some metadata', t => {
  t.deepEqual(getLambdaMetadata(instance), [option1, option2]);
});

test('findAll method should return 2: promised', t => {
  t.plan(1);

  return instance.findAll.apply(null, [
    { // aws event
      path: {
        arg1: 1,
        arg2: 2,
        arg3: 3
      }
    },
    { context: 'a' } // context
  ]).then((value) => {
    t.is(value, 'base123');
  });


});
