import 'reflect-metadata';

export const ServiceMetadata = Symbol('Service');

export interface ServiceOptions {
    readonly name: string;
}

export function Service(options: ServiceOptions): ClassDecorator {
    // console.log('constructing a class decorator', options)
    return (target) => {
        // console.log('decorating a class', target);
        Reflect.metadata(ServiceMetadata, options)(target);
    }
}

export function getServiceMetadata(instance) {
    return Reflect.getMetadata(ServiceMetadata, instance.constructor);
}

