// tslint:disable:no-expression-statement no-object-mutation
import test from 'ava';
import { Endpoint } from './endpoint/endpoint.decorator';
import { Lambda } from './lambda/lambda.decorator';
import { bootstrap } from './index';

@Endpoint({
  name: 'test-service'
})
class TestClass {
  @Lambda({
    method: 'get',
    name: 'manifest',
    path: '/'
  })
  public manifest() {
    console.log('manifest');
  }
}

let inst;

test.beforeEach(() => {
  inst = bootstrap(TestClass);
});

test('bootstrapExpress', t => {

  t.is(inst instanceof TestClass, true);
});
