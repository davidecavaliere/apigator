import 'reflect-metadata';

const EndpointMetadata = Symbol('Endpoint');

export interface EndpointOptions {
  readonly name: string;
  readonly basePath?: string;
  readonly private?: boolean;
  readonly cors?: boolean;
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
