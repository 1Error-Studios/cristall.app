class Localisation {
    constructor() {
        this.languagePackages = [];

        this.activeLanguage = null;
        this.defaultLanguage = null;
    }

    LoadPrebuiltPackages() {
        return new Promise((resolve, reject) => {
            window.electronAPI.invoke('localisation:load-prebuilt').then(localisation => {
                localisation = JSON.parse(localisation);

                Object.keys(localisation).forEach(item => {
                    this.languagePackages.push({
                        id: this.languagePackages.length,
                        name: localisation[item]['localisation_name'] ?? 'unnamed',
                        type: 'prebuilt',
                        languageCode: item,
                        package: localisation[item]
                    });
                });

                TakeNote('{WEB}.Localisation.LoadPrebuiltPackages()', `SUCCESS: Loaded ${Object.keys(localisation).length} instances`);

                return resolve();
            });
        });
    }

    DropKey(code, key) {
        let instance = this.languagePackages.find(item => item.languageCode === code);

        return instance.package[key];
    }

    SetupDefaultLanguage(code) {
        this.defaultLanguage = code;
    }

    SetupLanguageFromSettings(code) {
        this.activeLanguage = code;
    }

    DropActiveLanguage() {
        return this.activeLanguage;
    }

    DropLanguagesList() {
        let languages = [];

        this.languagePackages.forEach(item => {
            languages.push({
                name: item.name,
                value: item.languageCode
            });
        });

        return languages;
    }

    GetPackageName(code) {
        return this.languagePackages.find(item => item.languageCode === code).name;
    }
}