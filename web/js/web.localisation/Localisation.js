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

        console.log(instance.package[key])

        return instance.package[key];
    }
}