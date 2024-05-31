import path from "path";
import lang from "./language";
const PLUGIN_PATH = "./plugins/AgateBot/plugins/";
let filesArr = File.getFilesList(PLUGIN_PATH);
let pluginsNumbers = 0;

if (!File.exists(PLUGIN_PATH)) {
    File.mkdir(PLUGIN_PATH);
}
for (let _file of filesArr) {
    if (File.checkIsDir(path.join(PLUGIN_PATH, _file))) {
        let manifest = path.join(PLUGIN_PATH, _file, "manifest.json");
        if (File.exists(manifest)) {
            let _data;
            try {
                _data = JSON.parse(File.readFrom(manifest) as string);
            } catch (e) {
                logger.warn(lang.translate("plugin.error.read", [manifest]));
            }
            let lack = "";
            lack += "name" in _data ? "" : " name ";
            lack += "entry" in _data ? "" : " entry ";
            if (lack === "") {
                require(path.join("../", "plugins/", _file, _data.entry));
                pluginsNumbers++;
                logger.log(
                    lang.translate("plugin.succeed.individual", [_data.name])
                );
                continue;
            }
            logger.warn(
                lang.translate("plugin.error.property", [manifest, lack])
            );
        }
    }
}

logger.log(lang.translate("plugin.succeed.all", [pluginsNumbers.toString()]));
