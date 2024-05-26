import { bot } from './startBot';
import { botEvent } from './eventHelper';
import { resolve } from 'path';
import { rejects } from 'assert';

function apiExecute(
    action: string,
    params: { [key: string]: any },
    callback: Function,
    echo?: string
) {
    let success:boolean;
    let reason:unknown;
    try {
        let result = bot.send(
            JSON.stringify({
                action: action,
                params: params,
                echo: echo
            })
        );
        if (!result) {
            throw `Attempts to send a request to bot calling Api:${action} failed.Please check whether the connection to the bot is normal.`
        }
    } catch (e) {
        return { success: false, reason: e };
    }
    let _echo: string = echo ? echo : (Math.random() * 10000000).toString();
    Promise.race([
        new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('timeout');
            }, 30000);
        }),
        new Promise((resolve, reject) => {
            bot.listen('onTextReceived', msg => {
                let _msg = JSON.parse(msg) as Object;
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
                reason = "Waiting for the bot to reply timed out."
            }
        });
}

export { botEvent, apiExecute };
