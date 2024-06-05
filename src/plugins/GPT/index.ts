import OpenAI from "openai"
import { Assistants } from "openai/resources/beta/assistants";
import { JsonConfig } from "src/lib/configTemplate"

const PATH = "./plugins/AgateBot/plugins/GPT/"
const CONFIG = new JsonConfig(PATH + "config.json",{
    self_QQ: 10000,
    apiKey: "sk-xxxxxxx",
    baseURL: "https://free.gpt.ge",
    model: "",
    system_content:"你是一个minecraft交流群的AI助手",
    assistant_content:""
})

const openai = new OpenAI({apiKey:CONFIG.get("apiKey"),baseURL:"https://free.gpt.ge"});