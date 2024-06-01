// LiteLoader-AIDS automatic generated
/// <reference path="../helpLib/types/src/index.d.ts"/>
import lang from "./lib/language";
mc.listen("onServerStarted", () => {
    require("./API");
    colorLog("green", lang.translate("plugin.loaded"));
    require("./lib/pluginLoader");
});
