import { JsonI18n, JsonLanguage } from "./configTemplate";
import ConfigFile from "./configCreator";
import path from "path";

const PATH = "./plugins/AgateBot/language/";

//zh_CN
new JsonLanguage(path.join(PATH, "zh_CN.json"), {
    "plugin.loaded": "AgateBot, 启动！",
    "connection.connecting.error":
        "尝试连接到指定的WebSocket服务器失败。重新连接的次数：{1}；错误代码：{2}",
    "connection.max_reconnection":
        "已达到重新连接的最大次数，并且已放弃重新连接。",
    "connection.reconnecting": "正在尝试重新连接…",
    "connection.succeed": "已成功连接到机器人：{1}",
    "connection.on.error": "出现错误： {1}",
    "connection.on.lost":
        "与机器人的连接意外丢失。错误代码：{1} 正在尝试重新连接。。。",
    "plugin.error.read": "尝试读取文件时失败：{1}该文件的格式可能错误。",
    "plugin.succeed.individual": "插件“{1}”已成功加载。",
    "plugin.error.property": "{1}中缺少必要的配置属性：{2}",
    "plugin.succeed.all": "{1} 个插件已成功加载。",
    "api.error.request":
        "发送调用api:“ {1} ” 的请求时出错。请检查与机器人的连接是否正常。",
    "api.timeout.response": "等待bot的响应超时。echo: {}",
});

//en_US
new JsonLanguage(path.join(PATH, "en_US.json"), {
    "plugin.loaded": "The plugin 'AgateBot' has finished loading.",
    "connection.connecting.error":
        "An attempt to connect to the specified WebSocket server failed. Number of reconnections: {1}; error Code: {2}",
    "connection.max_reconnection":
        "The maximum number of reconnections has been reached and reconnection has been abandoned.",
    "connection.reconnecting": "Trying reconnecting...",
    "connection.succeed": "Successfully connected to the bot: {1}",
    "connection.on.error": "An error occurred: {1}",
    "connection.on.lost":
        "The connection to the robot was unexpectedly lost. code: {1} Trying to reconnect...",
    "plugin.error.read":
        "Attempt to read the file failed: {1} The file may be in the wrong format.",
    "plugin.succeed.individual": "Plugin '{1}' has loaded successfully.",
    "plugin.error.property":
        "Lack of necessary configuration attributes in {1} : {2}",
    "plugin.succeed.all": "{1} plugins have been loaded successfully.",
    "api.error.request":
        "Error sending request calling api:'{1}'. Please check that the connection to the bot is working.",
    "api.timeout.response": "Wait for a response timeout from bot. echo: {}",
});

let lang = new JsonI18n(PATH, ConfigFile.get("language"));
export default lang;
