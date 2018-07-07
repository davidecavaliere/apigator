"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lambda_1 = require("lambda");
const story_service_1 = require("./api/story/story.service");
const debug = require("debug");
// module dependencies.
const express = require("express");
const d = debug('lambda:example:express.ts');
d('----------------------------------');
const app = express();
// get port from environment and store in Express.
const port = 8080;
app.set('port', port);
// add error handler
// server.on('error', onError);
// start listening on port
// server.on('listening', onListening);
const service = lambda_1.boostrap(story_service_1.StoryService, '');
d('service is', service.list);
d(lambda_1.getServiceMetadata(service));
app.get('/echo', (req, res) => {
    d('running echo function');
    res.json({ hello: 'world' });
});
const endpoints = lambda_1.getEndpointMetadata(service);
d('endpoints are', endpoints);
for (const endpoint of endpoints) {
    d('adding endpoint', endpoint);
    app[endpoint.method](endpoint.path, service[endpoint.name]);
}
// create http server
const server = app.listen(port, () => {
    d('express is running');
});
//# sourceMappingURL=express.js.map