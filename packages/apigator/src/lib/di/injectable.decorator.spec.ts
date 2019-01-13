// tslint:disable:no-expression-statement no-object-mutation max-classes-per-file
import { getInjectable, Injectable } from './injectable.decorator';


@Injectable()
class TestClass {}

class NotAvailable {}

describe('injectable decorator', () => {

  it('@Injectable adds a class into list of injectables', () => {

    expect(getInjectable(TestClass)).toEqual(TestClass);
  });

  it('get a class form list of injectables', () => {
    expect(getInjectable(TestClass)).toEqual(TestClass);
  });

  // it('throw if not available', () => {
  //   const error = t.throws(() => {
  //     getInjectable(NotAvailable)
  //   }, Error);
  //
  //   t.deepEqual(error, Error('class NotAvailable {} is not available for injection. Did you forget to annotate it with @Injectable?'));
  // });
});


