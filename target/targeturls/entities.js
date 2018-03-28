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
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const entity_1 = require("../events/entity");
let Target = class Target extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Target.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], Target.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('boolean', { nullable: false, default: true }),
    __metadata("design:type", Boolean)
], Target.prototype, "active", void 0);
__decorate([
    class_validator_1.IsUrl(),
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], Target.prototype, "url", void 0);
__decorate([
    class_validator_1.IsArray(),
    typeorm_1.Column('simple-array', { nullable: false }),
    __metadata("design:type", Array)
], Target.prototype, "events", void 0);
__decorate([
    typeorm_1.OneToMany(() => entity_1.SentEvent, e => e.target),
    __metadata("design:type", Array)
], Target.prototype, "sentEvents", void 0);
Target = __decorate([
    typeorm_1.Entity()
], Target);
exports.Target = Target;
//# sourceMappingURL=entities.js.map