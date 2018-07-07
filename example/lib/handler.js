"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lambda_1 = require("lambda");
const story_service_1 = require("./api/story/story.service");
module.exports = lambda_1.boostrap(story_service_1.StoryService, '');
//# sourceMappingURL=handler.js.map