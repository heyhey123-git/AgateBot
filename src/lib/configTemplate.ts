class JsonConfig {
    constructor(path: string, defultValue: { [key: string]: any }) {
        this.mData = defultValue;
        this.mPath = path;
        this.init();
    }
    private mData;
    private mPath;

    init() {
        if (file.exists(this.mPath)) {
            let existDataStr = file.readFrom(this.mPath) as string;
            existDataStr = existDataStr.replace(/\/\/.*|\/\*[^]*?\*\//g, '');
            try {
                this.mData = Object.assign(
                    {},
                    this.mData,
                    JSON.parse(existDataStr)
                );
            } catch {
                let newPath = this.mPath + '_old';
                file.rename(this.mPath, newPath);
            }
        }
        this.save();
    }

    save(format = 4) {
        let dataStr = JSON.stringify(this.mData, null, format);
        file.writeTo(this.mPath, dataStr);
    }

    getData() {
        return this.mData;
    }

    get(key: string, defultValue = undefined) {
        let result = this.getData()[key];
        if (!result && defultValue != undefined) {
            this.set(key, defultValue);
            return defultValue;
        }
        return result;
    }

    set(key: string, value: string) {
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

    translate(key: string, data = []) {
        let result = this.get(key);
        if (result == null) {
            return key;
        }
        data.forEach((val, index) => {
            let old = `{${index + 1}}`;
            result = result.split(old).join(val);
        });
        return result;
    }
}

class JsonI18n {
    constructor(path: string, localLangCode = 'en_US') {
        if (!path.endsWith('/') && !path.endsWith('\\')) {
            path = path + '/';
        }
        this.mPath = path;
        this.mLangCode = localLangCode;
        this.mAllLanguages = {};
        this.mDefaultLangCode = 'en_US';
        this.loadAllLanguages();
    }

    private mPath;
    private mLangCode;
    private mAllLanguages: { [key: string]: JsonLanguage };
    private mDefaultLangCode;
    loadAllLanguages() {
        let exist_list = file.getFilesList(this.mPath);
        exist_list.forEach((name: string) => {
            let code = name.replace('.json', '');
            let path = this.mPath + name;
            let language = new JsonLanguage(path);
            this.mAllLanguages[code] = language;
        });
    }

    loadLanguage(langCode: string, defaultData = {}) {
        let langPath = this.mPath;
        langPath = langPath + langCode + '.json';
        let language = new JsonLanguage(langPath, defaultData);
        this.mAllLanguages[langCode] = language;
    }

    chooseLanguage(langCode: string) {
        this.mLangCode = langCode;
    }

    setDefaultLanguage(langCode: string) {
        this.mDefaultLangCode = langCode;
    }

    translate(key: string, data = [], langCode = this.mLangCode) {
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
