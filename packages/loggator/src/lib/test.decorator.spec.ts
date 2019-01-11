// tslint:disable:no-expression-statement, max-classes-per-file
import { test } from 'ava';
import 'reflect-metadata';
import { getDebugger } from './log.decorator';
import { getTestMetadata, Test, testMetadata } from './test.decorator';

const d = getDebugger('test.decorator');

d('running test');

@Test({
  my: 'option'
})
class TestClass {}

let inst1: TestClass;

test.beforeEach(() => {


  inst1 = new TestClass();
});

test('log decorator', t => {

  d('test inst1', inst1);

  d(Reflect.getMetadataKeys(TestClass));
  d(getTestMetadata(inst1));


  t.is(true, true);

});
