import { ConfigFile } from "./configCreator";

const bot = new WSClient();
let reconnectTimes = 0;

let connectCallback = (success: boolean) => {
    if (!success) {
        logger.error(
            "An attempt to connect to the specified WebSocket server failed. Number of reconnections:",
            reconnectTimes,
            " error Code:",
            bot.errorCode()
        );
        setTimeout(() => {
            let maxReconnectionTimes = ConfigFile.get("max_Reconnection_Times");
            if (maxReconnectionTimes !== 0) {
                if (maxReconnectionTimes < reconnectTimes) {
                    logger.error(
                        "The maximum number of reconnections has been reached and reconnection has been abandoned."
                    );
                }
            }
            reconnectTimes++;
            logger.info("Trying reconnecting...");
            bot.connectAsync(ConfigFile.get("Bot_Host"), connectCallback);
        }, 30000);
    }
    reconnectTimes = 0;
    colorLog("green", "Successfully connected to the bot:");
};
bot.connectAsync(ConfigFile.get("Bot_Host"), connectCallback);

bot.listen("onError", (msg) => {
    logger.error("An error occurred:", msg);
});
bot.listen("onLostConnection", (code) => {
    logger.error(
        "The connection to the robot was unexpectedly lost. code:",
        code,
        " Trying to reconnect..."
    );
    bot.connectAsync(ConfigFile.get("Bot_Host"), connectCallback);
});

export { bot };
