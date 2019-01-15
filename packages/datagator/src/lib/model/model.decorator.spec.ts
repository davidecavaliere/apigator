// tslint:disable:no-expression-statement no-object-mutation
import test from 'ava';
import { getModelMetadata, Model, ModelOptions } from '@microgamma/datagator';

const options: ModelOptions = {
  name: 'modelFactory-name'
};

@Model(options)
class TestClass {

  constructor() {
    console.log('running original constructor');
  }
}

let instance: TestClass;

test.beforeEach(() => {
  instance = new TestClass();
});

test('model decorator', t => {


  t.is(getModelMetadata(instance), options);

});
