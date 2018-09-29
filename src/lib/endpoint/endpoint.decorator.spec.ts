// tslint:disable:no-expression-statement no-object-mutation
import test from 'ava';
import { Endpoint, EndpointOptions, getEndpointMetadata } from './endpoint.decorator';

const options: EndpointOptions = {
  name: 'endpoint-name'
};

@Endpoint(options)
class TestClass {

}

let instance: TestClass;

test.beforeEach(() => {
  instance = new TestClass();
});

test('endpoint decorator', t => {
  // console.log('instance', instance);
  t.is(instance instanceof TestClass, true);
});

test('should store some metadata', t => {
  t.is(getEndpointMetadata(instance), options);
});