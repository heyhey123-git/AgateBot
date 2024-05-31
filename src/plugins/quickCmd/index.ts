import { botEvent, apiExecute, apiExecute_sync } from "../../API";
import { JsonConfig } from "../../lib/configTemplate";
const PATH = "./plugins/AgateBot/plugins/messageForward/";

interface config {
    groups: Number[];
    admin_is_op: boolean;
    op: Number[];
    self_qq: Number;
    cmd_flag: string;
    operator_remove_flag: string;
    operator_add_flag: string;
}
let configFile: config = {
    groups: [10000],
    admin_is_op: false,
    op: [1000],
    self_qq: 10000,
    cmd_flag: "c|",
    operator_remove_flag: "r|",
    operator_add_flag: "a|",
};
const CONFIG = new JsonConfig(PATH + "config.json", configFile);

botEvent.listen("onReceiveGroupMessage", (params: any) => {
    if (
        !CONFIG.get("groups").includes(params.group_id) ||
        params.sub_type !== "normal"
    ) {
        return;
    }
    let adminIsOP = CONFIG.get("admin_is_op");
    if (adminIsOP) {
        if (
            params.sender.role === "member" &&
            !CONFIG.get("op").includes(params.user_id)
        ) {
            return;
        }
    } else {
        if (!CONFIG.get("op").includes(params.user_id)) {
            return;
        }
    }
    let { message } = params;
    if (
        message.length !== 2 ||
        message[0].type !== "at" ||
        message[1].type !== "text"
    ) {
        return;
    }
    if (message[0].data.qq == CONFIG.get("self_qq")) {
        let text = message[1].data.text as string;
        let cmdFlag = CONFIG.get("cmd_flag") as string;
        let rmFlag = CONFIG.get("operator_remove_flag") as string;
        let addFlag = CONFIG.get("operator_add_flag") as string;
        let { group_id, user_id, message_id } = params;
        if (text.startsWith(cmdFlag)) {
            let cmd = text.slice(text.indexOf(cmdFlag) + 1);
            let result = mc.runcmdEx(cmd);
            let success = result.success ? "执行成功" : "执行失败";
            let { output } = result;
            let toSendMsg = `\n命令${cmd}已执行。\n执行结果：${success}；\n输出结果：${output}`;
            apiExecute_sync("send_group_msg_rate_limited" as "send_group_msg", {
                group_id: group_id,
                message: [
                    { type: "reply", data: { id: message_id } },
                    { type: "at", data: { qq: user_id } },
                    { type: "text", data: { text: toSendMsg } },
                ],
            });
            return;
        }
        if (text.startsWith(addFlag)) {
            let toAdd = text.slice(text.indexOf(rmFlag) + 1).trim();
            if (isNaN(Number(toAdd))) {
                apiExecute_sync(
                    "send_group_msg_rate_limited" as "send_group_msg",
                    {
                        group_id: group_id,
                        message: [
                            { type: "reply", data: { id: message_id } },
                            { type: "at", data: { qq: user_id } },
                            {
                                type: "text",
                                data: {
                                    text: `你所输入的内容"${toAdd}"并非一串纯数字。`,
                                },
                            },
                        ],
                    }
                );
                return;
            }
            let op = CONFIG.get("op") as Number[];
            let toAddInt = parseInt(toAdd);
            if (op.includes(toAddInt)) {
                apiExecute_sync(
                    "send_group_msg_rate_limited" as "send_group_msg",
                    {
                        group_id: group_id,
                        message: [
                            { type: "reply", data: { id: message_id } },
                            { type: "at", data: { qq: user_id } },
                            {
                                type: "text",
                                data: { text: `op列表里已经包含此人。` },
                            },
                        ],
                    }
                );
                return;
            }
            let opToWrite = op.push(toAddInt);
            CONFIG.set("op", opToWrite);
            apiExecute_sync("send_group_msg_rate_limited" as "send_group_msg", {
                group_id: group_id,
                message: [
                    { type: "reply", data: { id: message_id } },
                    { type: "at", data: { qq: user_id } },
                    { type: "text", data: { text: `已添加此人到op列表。` } },
                ],
            });
            return;
        }
        if (text.startsWith(rmFlag)) {
            let toRm = text.slice(text.indexOf(rmFlag) + 1).trim();
            if (isNaN(Number(toRm))) {
                apiExecute_sync(
                    "send_group_msg_rate_limited" as "send_group_msg",
                    {
                        group_id: group_id,
                        message: [
                            { type: "reply", data: { id: message_id } },
                            { type: "at", data: { qq: user_id } },
                            {
                                type: "text",
                                data: {
                                    text: `你所输入的内容"${toRm}"并非一串纯数字。`,
                                },
                            },
                        ],
                    }
                );
                return;
            }
            let op = CONFIG.get("op") as Number[];
            let toRmInt = parseInt(toRm);
            if (!op.includes(toRmInt)) {
                apiExecute_sync(
                    "send_group_msg_rate_limited" as "send_group_msg",
                    {
                        group_id: group_id,
                        message: [
                            { type: "reply", data: { id: message_id } },
                            { type: "at", data: { qq: user_id } },
                            {
                                type: "text",
                                data: { text: `op列表里未包含此人。` },
                            },
                        ],
                    }
                );
                return;
            }
            let opToWrite = op.splice(op.indexOf(toRmInt), 1);
            CONFIG.set("op", opToWrite);
            apiExecute_sync("send_group_msg_rate_limited" as "send_group_msg", {
                group_id: group_id,
                message: [
                    { type: "reply", data: { id: message_id } },
                    { type: "at", data: { qq: user_id } },
                    { type: "text", data: { text: `已夺取此人的权限。` } },
                ],
            });
            return;
        }
    }
});
