"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const db_1 = require("./db");
const controller_1 = require("./targeturls/controller");
const controller_2 = require("./events/controller");
const port = process.env.PORT || 4008;
exports.app = routing_controllers_1.createKoaServer({
    controllers: [
        controller_1.default,
        controller_2.default
    ]
});
db_1.default()
    .then(_ => exports.app.listen(4008, () => console.log('Listening on port 4008')))
    .catch(err => console.error(err));
//# sourceMappingURL=index.js.map