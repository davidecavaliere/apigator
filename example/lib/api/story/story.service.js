"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const lambda_1 = require("lambda");
let StoryService = class StoryService {
    constructor() {
        // debug('User Factory', this.User);
    }
    list() {
        return [{
                id: 1,
                title: 'Il nome della rosa',
                author: 'Umberto Eco'
            }];
    }
    getById(id) {
        return {
            id: 1,
            title: 'Il nome della rosa',
            author: 'Umberto Eco'
        };
    }
    getSubscriptions(id) {
        return ['Playboy', 'Penthouse'];
    }
    error(event) {
        throw new Error('something weird just happened');
    }
};
__decorate([
    lambda_1.Endpoint({
        method: 'get',
        path: '/',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StoryService.prototype, "list", null);
__decorate([
    lambda_1.Endpoint({
        method: 'get',
        path: '/{id}',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StoryService.prototype, "getById", null);
__decorate([
    lambda_1.Endpoint({
        method: 'get',
        path: '/{id}/subscriptions',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StoryService.prototype, "getSubscriptions", null);
__decorate([
    lambda_1.Endpoint({
        method: 'get',
        path: 'error',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StoryService.prototype, "error", null);
StoryService = __decorate([
    lambda_1.Service({
        name: 'storyService'
    }),
    __metadata("design:paramtypes", [])
], StoryService);
exports.StoryService = StoryService;
//# sourceMappingURL=story.service.js.map