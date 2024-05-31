// LiteLoader-AIDS automatic generated
/// <"../helpLib/types/src/index.d.ts"/>
/// <reference path="i:\Levilamina-Aids/dts/HelperLib-master/src/index.d.ts"/>
import lang from "./lib/language";
mc.listen("onServerStarted", () => {
    require("./API");
    colorLog("green", lang.translate("plugin.loaded"));
    require("./lib/pluginLoader");
});
