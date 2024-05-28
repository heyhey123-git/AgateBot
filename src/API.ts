import { bot } from "./lib/startBot";
import { botEvent } from "./lib/eventHelper";
import lang from "./lib/language";
interface APIreturns {
    /**
     * 是否成功调用
     */
    success: boolean;
    /**
     * 错误原因
     */
    reason: unknown;
}

type action =
  | "get_login_info"
  | "send_msg"
  | "send_group_msg"
  | "send_private_msg"
  | "get_msg"
  | "delete_msg"
  | "send_like"
  | "get_friend_list"
  | "set_friend_add_request"
  | "get_group_list"
  | "get_group_info"
  | "get_group_member_list"
  | "get_group_member_info"
  | "set_group_add_request"
  | "set_group_leave"
  | "set_group_kick"
  | "set_group_ban"
  | "set_group_whole_ban"
  | "set_group_admin"
  | "set_group_card"
  | "set_group_name"
  | "get_stranger_info"
  | "get_version_info"
  | "get_status"
  | "can_send_image"
  | "can_send_record"
  | "get_image"
  | "get_record"
  | "get_file"
  | "get_cookies"
  | "send_forward_msg"
  | "send_private_forward_msg"
  | "send_group_forward_msg"
  | "get_group_msg_history"
  | "get_forward_msg"
  | "upload_group_file"
  | "send_group_msg"
  | "set_qq_avatar"
  | "get_group_ignore_add_request"
  | "download_file"
  | "forward_friend_single_msg"
  | "forward_group_single_msg"
  | "set_msg_emoji_like"
  | "get_friends_with_category";

/**
 * 调用一个API
 * @param action 欲调用API的名称，可加后缀进行异步调用或限速调用，文档中有写的应该都可调
 * 详见文档： https://llonebot.github.io/zh-CN/develop/api
 * @param params 调用时传入的参数
 * 详见文档：https://llonebot.github.io/zh-CN/develop/api
 *          https://github.com/botuniverse/onebot-11/blob/master/api/public.md
 * @param callback API执行成功之后自动调用的回调函数，原型：
 * (param: { status: "failed"; retcode: 1404; data: null; echo: "123" }) => {};
 * 详见文档： https://github.com/botuniverse/onebot-11/tree/master/api
 * @param echo 用于唯一标识一次请求，若不填会自动生成一个随机数，防止请求回复的结果撞车
 * @returns {APIreturns} API请求结果
 */
function apiExecute(
    action: action,
    params: { [key: string]: any },
    callback: Function,
    echo?: string
): { success: boolean; reason: unknown } {
    let success = false;
    let reason: unknown = void 0;
    try {
        let result = bot.send(
            JSON.stringify({
                action: action,
                params: params,
                echo: echo,
            })
        );
        if (!result) {
            throw lang.translate("api.error.request", [action]);
        }
    } catch (e) {
        logger.error(e);
        return { success: false, reason: e };
    }
    let _echo: string = echo ? echo : (Math.random() * 10000000).toString();
    Promise.race([
        new Promise((resolve, reject) => {
            setTimeout(() => {
                reject("timeout");
            }, 30000);
        }),
        new Promise((resolve, reject) => {
            bot.listen("onTextReceived", (msg) => {
                let _msg = JSON.parse(msg) as Object;
                if (!("echo" in _msg)) {
                    return;
                }
                if (_msg.echo === _echo) {
                    resolve(_msg);
                }
            });
        }),
    ])
        .then((value) => {
            callback(value);
            success = true;
        })
        .catch((_reason) => {
            if (_reason === "timeout") {
                success = false;
                reason = lang.translate("api.timeout.response", [_echo]);
                logger.error(reason);
            }
        });
    return { success: success, reason: reason };
}


ll.exports(botEvent.listen, "AgateBot", "botEventListen");
ll.exports(apiExecute, "AgateBot", "APIExecute");

export { botEvent, apiExecute };
