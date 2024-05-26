// LiteLoader-AIDS automatic generated
/// <reference path="d:\Levilamina/dts/HelperLib-master/src/index.d.ts"/>

import { ConfigFile } from './configCreator';

const bot = new WSClient();
let reconnectTimes = 0;

let connectCallback = (success: boolean) => {
    if (!success) {
        logger.error(
            'An attempt to connect to the specified WebSocket server failed. Number of reconnections:',
            reconnectTimes,
            ' error Code:',
            bot.errorCode()
        );
        setTimeout(() => {
            bot.connectAsync(ConfigFile.get('Bot_Host'), connectCallback);
        }, 30000);
    }
};
bot.connectAsync(ConfigFile.get('Bot_Host'), connectCallback);

export { bot };
