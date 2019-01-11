// tslint:disable:no-expression-statement no-object-mutation
import test from 'ava';
import { bootstrap } from '../index';
import { getPermissionMetadata, getPermissionMetadataFromClass, Permission, PermissionOptions } from './permission.decorator';
import { Lambda, LambdaOptions } from '../..';

const option1: PermissionOptions = {
  allow: async (arg1, arg2, arg3) => {
    console.log('checking permission', arg1, arg2, arg3);
    return Promise.resolve(true);
  }
};

// const option2: PermissionOptions = {
//   allow: () => {
//     console.log('checking permission');
//     return true;
//   }
// };

const lambdaOptions: LambdaOptions = {
  method: 'get',
  name: 'lambda-name-1',
  path: '/'
};

class TestClass {
  public readonly toTestAccessToInstance: string = 'base';

  @Permission(option1)
  public async findAll(arg1, arg2, arg3) {
    // console.log('running original findAll()');
    return this.toTestAccessToInstance + arg1 + arg2 + arg3;
  }

  // @Permission(option2)
  // public async findOne() {
  //   return 1;
  // }
}

let instance: TestClass;

test.beforeEach(() => {
  instance = bootstrap(TestClass);
});

test('permission decorator', t => {
  t.is(instance instanceof TestClass, true);
});
//
// test('should allow execution of annotated method if some condition is met',  async (t) => {
//
//   t.is(await instance.findOne(), 1);
//
// });
//
// test('should not allow execution of annotated method if some condition is not met', async (t) => {
//
//   const error = await t.throws(instance.findAll('a', 'b', 'c'));
//
//   t.deepEqual(error, Error('Error: [405] method not allowed'));
//
// });

test.only('findAll method should return 2: promised', async (t) => {

  const retValue = await instance.findAll.apply(instance, [
    { // aws event
      path: {
        arg1: 1,
        arg2: 2,
        arg3: 3
      }
    },
    { context: 'a' } // context
  ]);

  t.is(retValue, 'base123');


});

// test('should store some metadata', t => {
//
//   t.deepEqual(getPermissionMetadata(instance), [option1, option2]);
//
// });
//
// test('should get metadata from class', (t) => {
//
//   t.deepEqual(getPermissionMetadataFromClass(TestClass), [option1, option2]);
//
// });
