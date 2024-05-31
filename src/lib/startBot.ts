import ConfigFile from "./configCreator";
import lang from "./language";
const bot = new WSClient();
let reconnectTimes = 0;

let connectCallback = (success: boolean) => {
    if (!success) {
        logger.error(
            lang.translate("connection.error", [
                reconnectTimes.toString(),
                bot.errorCode().toString(),
            ])
        );
        setTimeout(() => {
            let maxReconnectionTimes = ConfigFile.get("max_Reconnection_Times");
            if (maxReconnectionTimes !== 0) {
                if (maxReconnectionTimes < reconnectTimes) {
                    logger.error(lang.translate("connection.max_reconnection"));
                }
            }
            reconnectTimes++;
            logger.info(lang.translate("connection.connecting.error"), [
                reconnectTimes.toString(),
                bot.errorCode().toString(),
            ]);
            bot.connectAsync(ConfigFile.get("Bot_Host"), connectCallback);
        }, 30000);
        return;
    }
    reconnectTimes = 0;
    colorLog(
        "green",
        lang.translate("connection.succeed", [ConfigFile.get("Bot_Host")])
    );
};
bot.connectAsync(ConfigFile.get("Bot_Host"), connectCallback);

bot.listen("onError", (msg) => {
    logger.error(lang.translate("connection.on.error", [msg]));
});
bot.listen("onLostConnection", (code) => {
    logger.error(lang.translate("connection.on.lost", [code.toString()]));
    bot.connectAsync(ConfigFile.get("Bot_Host"), connectCallback);
});

export { bot };
