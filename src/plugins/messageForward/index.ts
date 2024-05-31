import { botEvent, apiExecute_sync } from "../../API";
import { JsonConfig } from "../../lib/configTemplate";
const PATH = "./plugins/AgateBot/plugins/messageForward/";
interface config {
    groups: Number[];
    sensitiveWords: string[];
}
let configFile: config = {
    groups: [10000],
    sensitiveWords: [""],
};
const CONFIG = new JsonConfig(PATH + "config.json", configFile);

function SensitiveWordsDetection(str: string) {
    let sWords = CONFIG.get("sensitiveWords") as string[];
    let newStr = str;
    for (let sWord of sWords) {
        if (/^\/.+\/[gimuy]*$/.test(sWord)) {
            let reg;
            try {
                reg = new RegExp(sWord);
            } catch (_a) {
                reg = sWord;
            }
            newStr = newStr.replace(reg, "***");
        }
    }
    return newStr;
}

botEvent.listen("onReceiveGroupMessage", (params: any) => {
    let { group_id } = params as { group_id: Number };
    let groupArr: Number[] = CONFIG.get("groups");
    if (!groupArr.includes(group_id)) {
        return;
    }
    let { time, raw_message, sender } = params as {
        time: number;
        raw_message: string;
        sender: { nickname: string; user_id: Number };
    };
    let senderInfo = `${sender.nickname}(${sender.user_id.toString()})`;
    let messageInfo = raw_message.replace(/CQ:/g, "");
    messageInfo = SensitiveWordsDetection(messageInfo);
    let timeInfo = new Date(time).toString();
    mc.broadcast(`${timeInfo} | ${senderInfo}: ${messageInfo}`);
});

mc.listen("onChat", (pl, msg) => {
    let { realName } = pl;
    let newMsg = SensitiveWordsDetection(msg);
    let newName = SensitiveWordsDetection(realName);
    let toSendText = `【服务器】 ${newName}: ${newMsg}`;
    let groups: Number[] = CONFIG.get("groups");
    for (let groupID of groups) {
        apiExecute_sync("send_group_msg_rate_limited" as "send_group_msg", {
            group_id: groupID,
            message: { type: "text", data: { text: toSendText } },
        });
    }
});
