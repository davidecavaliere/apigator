// tslint:disable:no-expression-statement no-object-mutation
import test from 'ava';
import { boostrap } from '../index';

class TestClass {}

test('boostrap', t => {
  const inst = boostrap(TestClass, '');
  t.is(inst instanceof TestClass, true);
});
