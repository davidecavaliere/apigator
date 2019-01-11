// tslint:disable:no-expression-statement no-object-mutation max-classes-per-file
import test from 'ava';
import { ODI } from './index';



@ODI.Injetable
class TestClass {
  public static instances: number = 0;

  constructor() {
    console.log('constructing TestClass');
    TestClass.instances++;
  }
}

class AClass {

  @ODI.Inject(TestClass)
  public testInstance: TestClass;

}

class BClass {

  @ODI.Inject(TestClass)
  public testInstance: TestClass;

}

let a: AClass;
let b: BClass;

test.beforeEach(() => {
  a = new AClass();
  b = new BClass();
});

test.only('a class annotated with @Injectable shall be instantiated only once', (t) => {

  t.is(TestClass.instances, 1);

});
