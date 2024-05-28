// LiteLoader-AIDS automatic generated
/// <"../helpLib/types/src/index.d.ts"/>
// LiteLoader-AIDS automatic generated
/// <reference path="d:\Levilamina/dts/HelperLib-master/src/index.d.ts"/>
import lang from "./lib/language";
mc.listen("onServerStarted", () => {
    require("./API");
    colorLog("green", lang.translate("plugin.loaded"));
});
