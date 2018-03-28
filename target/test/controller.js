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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const request = require("superagent");
const entities_1 = require("../targeturls/entities");
let TestController = class TestController {
    async getSubs() {
        const sub = await Subscription.find({ name: 'response' });
        if (!sub)
            throw new routing_controllers_1.BadRequestError('No sub found');
        return sub.map(sub => sub.target.url);
    }
    async createHook(body) {
        const newResponse = entities_1.Target.create(body).save();
        request
            .post('oururl/events')
            .send({
            eventname: 'response',
            data: newResponse
        });
    }
    async testHook(body) {
        try {
            await request
                .post('http://postb.in/NRQVD2Js')
                .send(body);
            return { message: 'All went well' };
        }
        catch (err) {
            return { message: err.message };
        }
    }
};
__decorate([
    routing_controllers_1.Get('/subs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestController.prototype, "getSubs", null);
__decorate([
    routing_controllers_1.Post('/hook'),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.Target]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "createHook", null);
__decorate([
    routing_controllers_1.Post('/events'),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "testHook", null);
TestController = __decorate([
    routing_controllers_1.JsonController()
], TestController);
exports.default = TestController;
const testObject = {
    name: 'test',
    active: true,
    events: ['response', 'newquiz'],
    url: 'example.com/test'
};
//# sourceMappingURL=controller.js.map