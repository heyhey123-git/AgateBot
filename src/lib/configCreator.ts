import { JsonConfig } from './configTemplate';

interface Config {
    IP: string;
    Port: number;
    Bot_Host: string;
    Self_ID: number;
    Receive_Group: number[];
}

let defaultConf: Config = {
    IP: '127.0.0.1',
    Port: 3000,
    Bot_Host: 'ws://localhost:3001',
    Self_ID: 10000,
    Receive_Group: [1001, 1002, 850517473]
};

let ConfigFile = new JsonConfig(
    './plugins/AgateBot/config/config.json',
    defaultConf
);

export { ConfigFile };
