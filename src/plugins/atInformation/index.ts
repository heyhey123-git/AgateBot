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


botEvent.listen("onReceiveGroupMessage",(params:any) => {
    let {message,group_id} = params as {message: any[],group_id:Number};
    if (message.length === 1 && message[0].type === "at") {
        //todo
    }
})