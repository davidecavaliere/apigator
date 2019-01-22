// tslint:disable:no-expression-statement no-object-mutation max-classes-per-file
import test from 'ava';
import { getInjectable, Injectable } from './injectable.decorator';


@Injectable()
class TestClass {}

class NotAvailable {
  public test() {
    return 12;
  }
}


test('@Injectable adds a class into list of injectables', (t) => {

  t.is(getInjectable(TestClass), TestClass);
});

test('get a class form list of injectables', (t) => {
  t.is(getInjectable(TestClass), TestClass);
});

test('throw if not available', (t) => {
  const error = t.throws(() => {
    getInjectable(NotAvailable)
  }, Error);

  t.deepEqual(error, Error('NotAvailable is not available for injection. Did you forget to annotate it with @Injectable?'));
});
