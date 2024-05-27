import path from "path";

const PLUGIN_PATH = "./plugins/AgateBot/plugins/";
let filesArr = file.getFilesList(PLUGIN_PATH);
let pluginsNumbers = 0;

for (let _file of filesArr) {
    if (file.checkIsDir(path.join(PLUGIN_PATH, _file))) {
        let manifest = path.join(PLUGIN_PATH, _file, "manifest.json");
        if (file.exists(manifest)) {
            let _data;
            try {
                _data = JSON.parse(file.readFrom(manifest) as string);
            } catch (e) {
                logger.warn(
                    "Failed while trying to read file:",
                    manifest,
                    "  The file may be in the wrong format"
                );
            }
            if ("name" in _data && "entry" in _data) {
                require(path.join(PLUGIN_PATH, _file, _data.entry));
                pluginsNumbers++;
                logger.log("Plugin'", _data.name, "'has loaded successfully.");
            }
        }
    }
}

logger.log(
    "All loadable plug-ins have been loaded. Number of plugins: ",
    pluginsNumbers
);
