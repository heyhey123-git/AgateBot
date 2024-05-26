"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigFile = void 0;
const configTemplate_1 = require("./configTemplate");
let defaultConf = {
    IP: '127.0.0.1',
    Port: 3000,
    Bot_Host: "ws://localhost:3001",
    Self_ID: 10000,
    Receive_Group: [1001, 1002, 850517473]
};
let ConfigFile = new configTemplate_1.JsonConfig('./plugins/AgateBot/config/config.json', defaultConf);
exports.ConfigFile = ConfigFile;
//# sourceMappingURL=configCreator.js.map