import { botEvent, apiExecute } from "../../API";
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
function SensitiveWordsDetection(str: string): string {
    let sWords = CONFIG.get("sensitiveWords") as string[];
    let newStr: string = "";
    for (let sWord of sWords) {
        if (/^\/.+\/[gimuy]*$/.test(sWord)) {
            let reg: RegExp | string;
            try {
                reg = new RegExp(sWord);
            } catch {
                reg = sWord;
            }
            newStr = str.replace(reg, "***");
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
        time: Number;
        raw_message: string;
        sender: { nickname: string; user_id: Number };
    };
    let senderInfo = `${sender.nickname}(${sender.user_id.toString()})`;
    let messageInfo = raw_message.replace(/CQ:/g, "");
    messageInfo = SensitiveWordsDetection(messageInfo);
    let timeInfo = new Date(time.toString()).toString();
    mc.broadcast(`${timeInfo} | ${senderInfo}: ${messageInfo}`);
});

mc.listen("onChat", (pl, msg) => {
    let { realName } = pl;
    let newMsg = SensitiveWordsDetection(msg);
    let groups: Number[] = CONFIG.get("groups");
    for (let groupID of groups) {
        apiExecute(
            "send_group_msg",
            { group_id: groupID, message: newMsg, auto_escape: false },
            (params: any) => {}
        );
    }
});
