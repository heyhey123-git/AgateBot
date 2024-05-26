"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.botEvent = void 0;
const startBot_1 = require("./startBot");
function botListener(params, callback) {
    let paramList = Object.keys(params);
    let equals = false;
    startBot_1.bot.listen('onTextReceived', msg => {
        let _msg = JSON.parse(msg);
        for (let arg of paramList) {
            if (!(arg in Object.keys(_msg))) {
                continue;
            }
            if (_msg[arg] !== params[arg]) {
                continue;
            }
            equals = true;
        }
        if (equals) {
            callback(_msg);
        }
    });
}
class botEvent {
}
exports.botEvent = botEvent;
botEvent.listen = (event, callback) => {
    switch (event) {
        case 'onReceiveGroupMessage':
            botListener({
                post_type: 'message',
                message_type: 'group'
            }, callback);
            break;
        case 'onReceivePrivateMessage':
            botListener({
                post_type: 'message',
                message_type: 'private'
            }, callback);
            break;
        case 'onGroupFileUpload':
            botListener({
                post_type: 'notice',
                notice_type: 'group_upload'
            }, callback);
            break;
        case 'onGroupAdminChange':
            botListener({
                post_type: 'notice',
                notice_type: 'group_admin'
            }, callback);
            break;
        case 'onGroupMemberDecrease':
            botListener({
                post_type: 'notice',
                notice_type: 'group_decrease'
            }, callback);
            break;
        case 'onGroupMemberAdd':
            botListener({
                post_type: 'notice',
                notice_type: 'group_increase'
            }, callback);
            break;
        case 'onGroupBan':
            botListener({
                post_type: 'notice',
                notice_type: 'group_increase'
            }, callback);
            break;
        case 'onFriendAdd':
            botListener({
                post_type: 'notice',
                notice_type: 'friend_add'
            }, callback);
            break;
        case 'onGroupRecallMsg':
            botListener({
                post_type: 'notice',
                notice_type: 'group_recall'
            }, callback);
            break;
        case 'onFriendRecallMsg':
            botListener({
                post_type: 'notice',
                notice_type: 'friend_recall'
            }, callback);
            break;
        case 'onGroupPoke':
            botListener({
                post_type: 'notice',
                sub_type: 'poke'
            }, callback);
            break;
        case 'onGroupLuckyKing':
            botListener({
                post_type: 'notice',
                sub_type: 'lucky_king'
            }, callback);
            break;
        case 'onGroupMemberHonorChange':
            botListener({
                post_type: 'notice',
                sub_type: 'honor'
            }, callback);
            break;
        case 'onAddFriendRequest':
            botListener({
                post_type: 'request',
                request_type: 'friend'
            }, callback);
            break;
        case 'onAddGroupRequest':
            botListener({
                post_type: 'request',
                request_type: 'group'
            }, callback);
            break;
        case 'onHeartBeat':
            botListener({
                post_type: 'meta_event',
                meta_event_type: 'heartbeat'
            }, callback);
            break;
        case 'onLifeCycle':
            botListener({
                post_type: 'meta_event',
                meta_event_type: 'lifecycle'
            }, callback);
            break;
        default:
            break;
    }
};
//# sourceMappingURL=eventHelper.js.map