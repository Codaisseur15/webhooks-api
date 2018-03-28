"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const controller_1 = require("./targeturls/controller");
const controller_2 = require("./events/controller");
const port = process.env.PORT || 4008;
exports.app = routing_controllers_1.createKoaServer({
    controllers: [
        controller_1.default,
        controller_2.default
    ]
});
//# sourceMappingURL=app.js.map