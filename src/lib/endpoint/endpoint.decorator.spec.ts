// tslint:disable:no-expression-statement no-object-mutation
import test from 'ava';
import { Endpoint, EndpointOptions, getEndpointMetadata } from './endpoint.decorator';
import { Service } from '../../';
import { boostrap } from '../index';

const option1: EndpointOptions = {
    method: 'get',
    name: 'endpoint-name-1',
    path: '/'
};

const option2: EndpointOptions = {
    method: 'get',
    name: 'endpoint-name-2',
    path: ':id'
};

@Service({
    name: 'service'
})
class TestClass {
    public readonly toTestAccessToInstance: string = 'base';

    @Endpoint(option1)
    public findAll(arg1, arg2, arg3) {
        // console.log('running original findAll()');
        return this.toTestAccessToInstance + arg1 + arg2 + arg3;
    }

    @Endpoint(option2)
    public findOne() {
        return 1;
    }

}

let instance: TestClass;

test.beforeEach(() => {
    instance = boostrap(TestClass, 'express');
})

test('endpoint decorator', (t) => {
    // console.log('instance', instance);
    t.is(instance instanceof TestClass, true);
});

test('should store some metadata', (t) => {


    t.deepEqual(getEndpointMetadata(instance), [option1, option2]);
});

test('findAll method should return 2: promised', (t) => {
    t.plan(1);
    const retValue: Promise<any> =
    instance.findAll.apply(null, [{
        arg1: 1,
        arg2: 2,
        arg3: 3
    }, {context: 'a'}, (...args) => {
        // console.log('running callback', args);
    }]);

    return retValue.then((value) => {
        // console.log(value);
        t.is(value, 'base123');
    })

});