import { boostrap, getEndpointMetadata, getServiceMetadata } from 'lambda';
import { StoryService } from './api/story/story.service';
import debug = require('debug');
// module dependencies.
import express = require('express');

const d: debug.IDebugger = debug('lambda:example:express.ts');

d('----------------------------------');


const app = express();

// get port from environment and store in Express.
const port = 8080;
app.set('port', port);




// add error handler
// server.on('error', onError);

// start listening on port
// server.on('listening', onListening);

const service: StoryService = boostrap(StoryService, '');


app.get('/echo/:word', (req, res) => {
   res.json(req.params.word);
});

const endpoints = getEndpointMetadata(service);

for (const endpoint of endpoints) {
    d('adding endpoint', endpoint);

    app[endpoint.method](endpoint.path, (req, res) => {

        d('params', req.params)
        service[endpoint.name].apply(service, [
            req.params, // event
            null, // context
            (...args) => {
                d('calling callback with', args);
                const retValue = args[1];
                res.json(retValue);
            }// cb
        ]);

    });

}

// create http server
const server = app.listen(port, () => {
    d('express is running');
});
