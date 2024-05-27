import { bot } from "./lib/startBot";
import { botEvent } from "./lib/eventHelper";

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
/**
 * 调用一个API
 * @param action 欲调用API的名称，可加后缀进行异步调用或限速调用
 * 详见文档： https://github.com/botuniverse/onebot-11/tree/master/api
 * @param params 调用时传入的参数
 * @param callback API执行成功之后自动调用的回调函数，原型：
 * (param: { status: "failed"; retcode: 1404; data: null; echo: "123" }) => {};
 * 详见文档： https://github.com/botuniverse/onebot-11/tree/master/api 
 * @param echo 用于唯一标识一次请求，若不填会自动生成一个随机数，防止请求回复的结果撞车
 * @returns {APIreturns} API请求结果
 */
function apiExecute(
    action: string,
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
            throw `Attempts to send a request to bot calling Api:${action} failed.Please check whether the connection to the bot is normal.`;
        }
    } catch (e) {
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
                reason = "Waiting for the bot to reply timed out.";
            }
        });
    return { success: success, reason: reason };
}

ll.exports(botEvent.listen, "AgateBot", "botEventListen");
ll.exports(apiExecute, "AgateBot", "APIExecute");

export { botEvent, apiExecute };
