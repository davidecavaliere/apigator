// tslint:disable:no-expression-statement no-object-mutation
import test from 'ava';
import { Lambda, LambdaOptions } from './lambda.decorator';
import { Endpoint } from '../../';
import { boostrap } from '../index';
import { Authorizer, getAuthorizerMetadata } from './authorizer.decorator';

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

  @Authorizer()
  public async authorize(token, resource): Promise<boolean> {
    console.log('token', token);
    console.log('resource', resource);
    return token.scope.some(value => value === resource);
  }
}

let instance: TestClass;

test.beforeEach(() => {
  instance = boostrap(TestClass, 'express');
});

test('authorize function', (t) => {
  t.plan(1);

  return instance.authorize.apply(instance, [{
    authorizationToken: {
      scope: ['some-method-arn']
    },
    methodArn: 'some-method-arn'
  }]).then((value) => {
    t.deepEqual(value, {

      principalId: {
        scope: ['some-method-arn']
      },
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: 'some-method-arn',
          },
        ],
      }
    });
  });
});


