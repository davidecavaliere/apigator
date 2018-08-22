import 'reflect-metadata';

const EndpointMetadata = 'Endpoint';

export interface EndpointOptions {
  readonly name: string;
}

export function Endpoint(options: EndpointOptions): ClassDecorator {
  // console.log('constructing a class decorator', options)
  return <TFunction extends Function>(target: TFunction) => {
    // console.log('decorating a class', target);
    Reflect.metadata(EndpointMetadata, options)(target);
  };
}

export function getEndpointMetadata(instance) {
  return Reflect.getMetadata(EndpointMetadata, instance.constructor);
}
