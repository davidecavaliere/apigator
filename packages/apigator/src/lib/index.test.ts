// tslint:disable:no-expression-statement no-object-mutation


import { bootstrap, Endpoint, Lambda } from '../';

@Endpoint({
  name: 'test-service'
})
class TestClass {
  @Lambda({
    method: 'get',
    name: 'manifest',
    path: '/'
  })
  public manifest() {
    console.log('manifest');
  }
}

describe('bootstrap', () => {

  let inst;

  beforeEach(() => {
    inst = bootstrap(TestClass);
  });

  it('should bootstrap application', () => {

    expect(inst instanceof TestClass).toBeTruthy();
  });
});

