import { JsonConfig } from "./configTemplate";

interface Config {
    Bot_Host: string;
    max_Reconnection_Times: number;
    language: string;
}

let defaultConf: Config = {
    Bot_Host: "ws://localhost:3001",
    max_Reconnection_Times: 0,
    language: "en_US",
};

let ConfigFile = new JsonConfig(
    "./plugins/AgateBot/config/config.json",
    defaultConf
);

export default ConfigFile;
