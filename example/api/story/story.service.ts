import { Service, Endpoint } from 'lambda';

@Service({
    name: 'storyService'
})
class StoryService {


    constructor() {

        // debug('User Factory', this.User);
    }

    @Endpoint({
        method: 'get',
        path: '/',
    })
    public list() {
        return [{
            id: 1,
            title: 'Il nome della rosa',
            author: 'Umberto Eco'
        }];

    }

    @Endpoint({
        method: 'get',
        path: '/:id',
    })
    public getById(id) {

        return {
            id: id,
            title: 'Il nome della rosa',
            author: 'Umberto Eco'
        };

    }

    @Endpoint({
        method: 'get',
        path: '/:id/subscriptions',
    })
    public getSubscriptions(id) {
        return ['Playboy', 'Penthouse'];

    }


    @Endpoint({
        method: 'get',
        path: 'error',
    })
    public error(event) {
        throw new Error('something weird just happened');
    }
}

export { StoryService };
