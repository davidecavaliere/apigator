// tslint:disable:no-expression-statement no-object-mutation
import test from 'ava';
import { bootstrapExpress } from './index';
import { Endpoint } from './endpoint/endpoint.decorator';
import { Lambda } from './lambda/lambda.decorator';

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

test.only('bootstrapExpress', t => {
  const app = {
    get: (...args) => {
      // console.log('setting args', args);
    }
  };
  const inst = bootstrapExpress(TestClass, app);

  t.is(inst instanceof TestClass, true);
});
