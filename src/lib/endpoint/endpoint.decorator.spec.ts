// tslint:disable:no-expression-statement no-object-mutation
import test from 'ava';
import { Endpoint, EndpointOptions, getEndpointMetadata } from './endpoint.decorator';
import { setNamespace } from '@microgamma/ts-debug/build/main/lib/log.decorator';

const options: EndpointOptions = {
  name: 'endpoint-name'
};

setNamespace('lambda');

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