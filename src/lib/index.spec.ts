// tslint:disable:no-expression-statement no-object-mutation
import test from 'ava';
import { boostrap, bootstrapExpress } from './index';
import { Service } from './services/service.decorator';
import { Endpoint } from './endpoint/endpoint.decorator';

@Service({
    name: 'test-service'
})
class TestClass {

    @Endpoint({
        method: 'get',
        name: 'manifest',
        path: '/'
    })
    public manifest() {

    }
}

test.only('bootstrapExpress', (t) => {
    const app = {
      get: (...args) => {
        // console.log('setting args', args);
      }
    }
    const inst = bootstrapExpress(TestClass, app);



    t.is(inst instanceof TestClass, true);
});
