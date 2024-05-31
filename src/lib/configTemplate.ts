import fs from "fs";
import * as FilePath from "path";
import * as JSON5 from "json5";

class JsonConfig {
    constructor(configPath: string, defultValue: any) {
        this.mData = defultValue;
        this.mPath = configPath;
        this.init();
    }
    private mData;
    private mPath;
    init() {
        if (fs.existsSync(this.mPath)) {
            let existDataStr = fs.readFileSync(this.mPath, {
                encoding: "utf-8",
            });
            try {
                this.mData = Object.assign(
                    {},
                    this.mData,
                    JSON5.parse(existDataStr)
                );
            } catch {
                let newPath = this.mPath + "_old";
                fs.rename(this.mPath, newPath, () => {});
            }
        }
        this.save();
    }

    save(format = 4) {
        let dataStr = JSON.stringify(this.mData, null, format);
        let dirPath = FilePath.dirname(this.mPath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
        fs.writeFileSync(this.mPath, dataStr);
    }

    getData() {
        return this.mData;
    }

    get(key: string, defultValue: any = undefined) {
        let result = this.getData()[key];
        if (!result && defultValue != undefined) {
            this.set(key, defultValue);
            return defultValue;
        }
        return result;
    }

    set(key: string, value: any) {
        this.getData()[key] = value;
        this.save();
    }

    delete(key: string) {
        delete this.getData()[key];
        this.save();
    }
}

class JsonLanguage extends JsonConfig {
    constructor(path: string, defultValue = {}) {
        super(path, defultValue);
    }

    translate(key: string, data: any = []) {
        let result = this.get(key);
        if (result == null) {
            return key;
        }
        data.forEach((val: any, index: number) => {
            let old = `{${index + 1}}`;
            result = result.split(old).join(val);
        });
        return result;
    }
}

class JsonI18n {
    constructor(path: string, localLangCode = "en_US") {
        if (!path.endsWith("/") && !path.endsWith("\\")) {
            path = path + "/";
        }
        this.mPath = path;
        if (!fs.existsSync(this.mPath)) {
            fs.mkdirSync(this.mPath);
        }
        this.mLangCode = localLangCode;
        this.mAllLanguages = {};
        this.mDefaultLangCode = "en_US";
        this.loadAllLanguages();
    }
    private mPath: string;
    private mLangCode: string;
    private mAllLanguages: { [key: string]: any };
    private mDefaultLangCode: string;
    loadAllLanguages() {
        let exist_list = fs.readdirSync(this.mPath);
        exist_list.forEach((name: string) => {
            let code = name.replace(".json", "");
            let path = this.mPath + name;
            let language = new JsonLanguage(path);
            this.mAllLanguages[code] = language;
        });
    }

    loadLanguage(langCode: string, defaultData: any = {}) {
        let langPath = this.mPath;
        langPath = langPath + langCode + ".json";
        let language = new JsonLanguage(langPath, defaultData);
        this.mAllLanguages[langCode] = language;
    }

    chooseLanguage(langCode: string) {
        this.mLangCode = langCode;
    }

    setDefaultLanguage(langCode: string) {
        this.mDefaultLangCode = langCode;
    }

    translate(key: string, data: any = [], langCode = this.mLangCode) {
        let language = this.mAllLanguages[langCode];
        let result = language.translate(key, data);
        if (result == key) {
            let language = this.mAllLanguages[this.mDefaultLangCode];
            if (language) {
                result = language.translate(key, data);
            }
        }
        return result;
    }
}

export { JsonConfig, JsonLanguage, JsonI18n };
