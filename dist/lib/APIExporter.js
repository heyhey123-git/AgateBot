"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiExecute = exports.botEvent = void 0;
const startBot_1 = require("./startBot");
const eventHelper_1 = require("./eventHelper");
Object.defineProperty(exports, "botEvent", { enumerable: true, get: function () { return eventHelper_1.botEvent; } });
function apiExecute(action, params, callback, echo) {
    let success;
    let reason;
    try {
        let result = startBot_1.bot.send(JSON.stringify({
            action: action,
            params: params,
            echo: echo
        }));
        if (!result) {
            throw `Attempts to send a request to bot calling Api:${action} failed.Please check whether the connection to the bot is normal.`;
        }
    }
    catch (e) {
        return { success: false, reason: e };
    }
    let _echo = echo ? echo : (Math.random() * 10000000).toString();
    Promise.race([
        new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('timeout');
            }, 30000);
        }),
        new Promise((resolve, reject) => {
            startBot_1.bot.listen('onTextReceived', msg => {
                let _msg = JSON.parse(msg);
                if (!('echo' in _msg)) {
                    return;
                }
                if (_msg.echo === _echo) {
                    resolve(_msg);
                }
            });
        })
    ])
        .then(value => {
        callback(value);
    })
        .catch(_reason => {
        if (_reason === 'timeout') {
            reason = "Waiting for the bot to reply timed out.";
        }
    });
}
exports.apiExecute = apiExecute;
//# sourceMappingURL=APIExporter.js.map