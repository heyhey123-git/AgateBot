import { botEvent, apiExecute_sync } from "../../API";
import { JsonConfig } from "../../lib/configTemplate";
const {
    PAPI,
} = require("../../../GMLIB-LegacyRemoteCallApi/lib/BEPlaceholderAPI-JS");

const PATH = "./plugins/AgateBot/plugins/atInformation/";
interface config {
    groups: Number[];
    sensitiveWords: string[];
    self_QQ: Number;
    serverInformation: string;
}
let configFile: config = {
    groups: [10000],
    sensitiveWords: [""],
    self_QQ: 10000,
    serverInformation:
        "，你所查询的信息如下：\n服务器版本：%server_version%(%server_protocol_version%)\n在线玩家:%server_online%\n实体数量:%server_total_entities%\nTps:%server_tps%\nMspt:%server_mspt%\nBDS占用内存:%server_ram_bds_used%",
};
const CONFIG = new JsonConfig(PATH + "config.json", configFile);

botEvent.listen("onReceiveGroupMessage", (params: any) => {
    let { message, group_id, message_id, user_id } = params as {
        message: any[];
        group_id: Number;
        message_id: Number;
        user_id: Number;
    };
    let groups = CONFIG.get("groups") as Number[];
    if (!groups.includes(group_id)) {
        return;
    }
    if (
        message.length === 1 &&
        message[0].type === "at" &&
        message[0].data.qq == CONFIG.get("self_QQ") &&
        params.sub_type === "normal"
    ) {
        let toSendMsg = [
            { type: "at", data: { qq: user_id.toString() } },
            {
                type: "text",
                data: {
                    text: PAPI.translateString(CONFIG.get("serverInformation")),
                },
            },
        ];
        apiExecute_sync(
            "send_group_msg_rate_limited" as "send_group_msg",
            { group_id: group_id, message: toSendMsg }
        );
    }
});
