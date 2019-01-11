// tslint:disable:no-expression-statement no-object-mutation max-classes-per-file
import test from 'ava';
import { Injectable } from './injectable.decorator';
import { Inject } from './inject.decorator';


@Injectable()
class TestClassA {
  constructor() {
    console.log('this is the constructor of TestClassA');
  }

  public sayHello(className: string) {
    console.log(`Hello from A to ${className}`);
  }
}
@Injectable()
class TestClassB {
  constructor() {
    console.log('this is the constructor of TestClassB');
  }

  public sayHello(className: string) {
    console.log(`Hello from B to ${className}`);
  }
}

class Consumer {

  @Inject(TestClassA)
  public testClassA: TestClassA;

  @Inject(TestClassA)
  public testClassA2: TestClassA;

  @Inject(TestClassB)
  public testClassB: TestClassB;

  constructor() {
    console.log('this is the constructor of Consumer');
    this.testClassA.sayHello('Consumer');
    this.testClassB.sayHello('Consumer');
  }

}

let consumer: Consumer;

test.beforeEach(() => {
  consumer = new Consumer();
});

test('@Inject', (t) => {

  t.is(consumer.testClassA instanceof TestClassA, true);
  // t.is(consumer.testClassB, {});

});
