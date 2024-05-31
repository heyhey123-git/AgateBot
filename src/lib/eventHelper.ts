import { bot } from "./startBot";

type eventName =
    | "onReceiveGroupMessage"
    | "onReceivePrivateMessage"
    | "onGroupFileUpload"
    | "onGroupAdminChange"
    | "onGroupMemberDecrease"
    | "onGroupMemberAdd"
    | "onGroupBan"
    | "onFriendAdd"
    | "onGroupRecallMsg"
    | "onFriendRecallMsg"
    | "onGroupPoke"
    | "onFriendPoke"
    | "onAddFriendRequest"
    | "onAddGroupRequest"
    | "onHeartBeat"
    | "onLifeCycle"
    | "onEmojiLike";

function botListener(params: { [key: string]: any }, callback: Function): void {
    let paramList = Object.keys(params);
    let equals = true;
    bot.listen("onTextReceived", (msg) => {
        let _msg = JSON.parse(msg.toString()) as { [key: string]: any };
        for (let arg of paramList) {
            equals = true;
            if (!_msg.hasOwnProperty(arg)) {
                equals = false;
                break;
            }
            if (params[arg] !== "" && _msg[arg] !== params[arg]) {
                equals = false;
                break;
            }
        }
        if (equals) {
            callback(_msg);
        }
    });
}

class botEvent {
    /**
     * 注册一个监听器
     * @param event 所监听事件名称
     * @param callback 当目标时间触发时自动执行的回调，自动传入一个包含事件数据的对象
     *          函数原型：(params) => {} 其中params为一个包含事件数据的对象
     * 对于对象params，详见文档：https://llonebot.github.io/zh-CN/develop/event#%E8%A1%A8%E6%83%85%E5%9B%9E%E5%BA%94%E4%B8%8A%E6%8A%A5
     */

    static listen = (event: eventName, callback: Function): void => {
        switch (event) {
            case "onReceiveGroupMessage":
                botListener(
                    {
                        post_type: "message",
                        message_type: "group",
                    },
                    callback
                );
                break;
            case "onReceivePrivateMessage":
                botListener(
                    {
                        post_type: "message",
                        message_type: "private",
                    },
                    callback
                );
                break;
            case "onGroupFileUpload":
                botListener(
                    {
                        post_type: "notice",
                        notice_type: "group_upload",
                    },
                    callback
                );
                break;
            case "onGroupAdminChange":
                botListener(
                    {
                        post_type: "notice",
                        notice_type: "group_admin",
                    },
                    callback
                );
                break;
            case "onGroupMemberDecrease":
                botListener(
                    {
                        post_type: "notice",
                        notice_type: "group_decrease",
                    },
                    callback
                );
                break;

            case "onGroupMemberAdd":
                botListener(
                    {
                        post_type: "notice",
                        notice_type: "group_increase",
                    },
                    callback
                );
                break;
            case "onGroupBan":
                botListener(
                    {
                        post_type: "notice",
                        notice_type: "group_increase",
                    },
                    callback
                );
                break;
            case "onFriendAdd":
                botListener(
                    {
                        post_type: "notice",
                        notice_type: "friend_add",
                    },
                    callback
                );
                break;
            case "onGroupRecallMsg":
                botListener(
                    {
                        post_type: "notice",
                        notice_type: "group_recall",
                    },
                    callback
                );
                break;

            case "onFriendRecallMsg":
                botListener(
                    {
                        post_type: "notice",
                        notice_type: "friend_recall",
                    },
                    callback
                );
                break;
            case "onGroupPoke":
                botListener(
                    {
                        post_type: "notice",
                        sub_type: "poke",
                        group_id: "",
                    },
                    callback
                );
                break;
            case "onFriendPoke":
                botListener(
                    {
                        post_type: "notice",
                        sub_type: "poke",
                    },
                    callback
                );
                break;
            case "onAddFriendRequest":
                botListener(
                    {
                        post_type: "request",
                        request_type: "friend",
                    },
                    callback
                );
                break;

            case "onAddGroupRequest":
                botListener(
                    {
                        post_type: "request",
                        request_type: "group",
                    },
                    callback
                );
                break;
            case "onHeartBeat":
                botListener(
                    {
                        post_type: "meta_event",
                        meta_event_type: "heartbeat",
                    },
                    callback
                );
                break;
            case "onLifeCycle":
                botListener(
                    {
                        post_type: "meta_event",
                        meta_event_type: "lifecycle",
                    },
                    callback
                );
                break;
            case "onEmojiLike":
                botListener(
                    {
                        post_type: "notice",
                        notice_type: "group_msg_emoji_like",
                    },
                    callback
                );
                break;
            default:
                break;
        }
    };
}
export { botEvent };
