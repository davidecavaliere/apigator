// tslint:disable:no-expression-statement no-object-mutation
import { Endpoint, EndpointOptions, getEndpointMetadata, getEndpointMetadataFromClass } from './endpoint.decorator';

const options: EndpointOptions = {
  name: 'endpoint-name'
};

@Endpoint(options)
class TestClass {

}

let instance: TestClass;

describe('endpoint decorator', () => {
  beforeEach(() => {
    instance = new TestClass();
  });
  
  
  it('endpoint decorator', () => {
    expect(instance instanceof TestClass).toBeTruthy();
  });
  
  
  it('should store some metadata', () => {
    expect(getEndpointMetadata(instance)).toEqual(options);
  });
  
  it('should get metadata from Class', () => {
    const metadata = getEndpointMetadataFromClass(TestClass);
  
    expect(metadata).toEqual(options);
  });
});


