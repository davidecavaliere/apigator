// tslint:disable:no-expression-statement, max-classes-per-file
import { test } from 'ava';
import { Log, setNamespace } from './log.decorator';
import 'reflect-metadata';


setNamespace('myNamespace');

class TestClass {

  @Log()
  private $l;

  constructor() {
    // this.$l.d('constructing', this);
  }
}
let instance: TestClass;

setNamespace('ns2');

class TestClassNS2 {

  @Log()
  private $l;

  constructor() {
    this.$l.d('test 2nd ns');
  }
}

let instance2: TestClassNS2;

setNamespace('ns3');

class TestClassNS3 {
  @Log()
  private $l;

  constructor() {
    this.$l.d('test 3nd ns');
  }
}

let instance3: TestClassNS3;

test.beforeEach(() => {
  instance = new TestClass();
  instance2 = new TestClassNS2();
  instance3 = new TestClassNS3();
});

test('log decorator', t => {
  t.is(true, true);

});
