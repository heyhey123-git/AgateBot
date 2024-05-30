import { botEvent, apiExecute } from "../../API";
import { JsonConfig } from "../../lib/configTemplate";
const PATH = "./plugins/AgateBot/plugins/messageForward/";

interface config {
    groups: Number[];
    admin_is_op: boolean;
    op: Number[];
    self_qq : Number;
}
let configFile: config = {
    groups: [10000],
    admin_is_op: false,
    op: [1000],
    self_qq: 10000
};
const CONFIG = new JsonConfig(PATH + "config.json", configFile);

botEvent.listen("onReceiveGroupMessage",(params:any) => {
    if (!CONFIG.get("groups").includes(params.group_id) || params.sub_type !== "normal") {
        return;
    }
    let adminIsOP = CONFIG.get("admin_is_op");
    if (adminIsOP) {
        if (params.sender.role === "member") {
            return;
        }
    } else {
        if (!CONFIG.get("op").includes(params.user_id)) {
            return;
        }
    }
    let {message} = params;
    if (message.length !== 2 || message[0].type !== "at" || message[1].type !== "text") {
        return;
    }
    if (message[0].data.qq == CONFIG.get("self_qq")) {
        let text = message[1].data.text as string
        if (text.startsWith("c |")) {
            let cmd = text.slice(text.indexOf("|") + 1);
            let result = mc.runcmdEx(cmd);
            let success = result.success ? "执行成功" : "执行失败";
            let {output} = result;
            let toSendMsg = `\n命令${cmd}已执行。\n执行结果：${success}；\n输出结果：${output}`;
            let {group_id,user_id} = params;
            apiExecute("send_group_msg",{group_id:group_id,message:[{type:"at",data:{qq:user_id}},{type:"text",data:{text:toSendMsg}}]},() => {})
        }
    }
})