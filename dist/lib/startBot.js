"use strict";
// LiteLoader-AIDS automatic generated
/// <reference path="d:\Levilamina/dts/HelperLib-master/src/index.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
const configCreator_1 = require("./configCreator");
const bot = new WSClient();
exports.bot = bot;
let reconnectTimes = 0;
let connectCallback = (success) => {
    if (!success) {
        logger.error('An attempt to connect to the specified WebSocket server failed. Number of reconnections:', reconnectTimes, " error Code:", bot.errorCode());
        setTimeout(() => {
            bot.connectAsync(configCreator_1.ConfigFile.get('Bot_Host'), connectCallback);
        }, 30000);
    }
};
bot.connectAsync(configCreator_1.ConfigFile.get('Bot_Host'), connectCallback);
//# sourceMappingURL=startBot.js.map