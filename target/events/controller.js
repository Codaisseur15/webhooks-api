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
const entities_1 = require("../targeturls/entities");
const typeorm_1 = require("typeorm");
const request = require("superagent");
const entity_1 = require("./entity");
let EventController = class EventController {
    async sendEvent(body) {
        const hooks = await typeorm_1.getRepository(entities_1.Target)
            .createQueryBuilder("hook")
            .where("hook.events like :event", { event: `%${body.event}%` })
            .getMany();
        const promises = hooks.map(hook => {
            return request
                .post(hook.url)
                .send(body)
                .then(res => {
                return { hook, status: res.status, event: body };
            })
                .catch(err => {
                return { hook, status: err.status, event: body };
            });
        });
        const requestResults = await Promise.all(promises);
        const dbPromises = requestResults.map(res => {
            const { status, event, hook } = res;
            return entity_1.SentEvent.create({
                target: hook,
                status,
                event
            }).save();
        });
        return Promise.all(dbPromises);
    }
};
__decorate([
    routing_controllers_1.Post('/events'),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "sendEvent", null);
EventController = __decorate([
    routing_controllers_1.JsonController()
], EventController);
exports.default = EventController;
//# sourceMappingURL=controller.js.map