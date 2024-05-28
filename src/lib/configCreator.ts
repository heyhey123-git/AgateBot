import { JsonConfig } from "./configTemplate";

interface Config {
    Bot_Host: string;
    Self_QQ: number;
    max_Reconnection_Times: number;
    language: string;
}

let defaultConf: Config = {
    Bot_Host: "ws://localhost:3001",
    Self_QQ: 10000,
    max_Reconnection_Times: 0,
    language: "en_US",
};

let ConfigFile = new JsonConfig(
    "./plugins/AgateBot/config/config.json",
    defaultConf
);

export default ConfigFile;
