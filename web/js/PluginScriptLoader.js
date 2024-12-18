class ScriptLoader {
    constructor() {
        this.apis = [];
    }

    LoadScripts(scriptResource, fire) {
        scriptResource.entries.forEach(script => {
            window.electronAPI.invoke('plugins:load:script', {
                pluginName: `${pluginLoader.GetPluginData(fire).data.name}.${pluginLoader.GetPluginData(fire).data.com}`,
                file: script.file
            }).then(data => {
                let loader = document.createElement('script');
                loader.setAttribute('src', data);

                document.head.append(loader);

                loader.addEventListener('load', () => {
                    this.apis.push({
                        index: script.index,
                        api: Module
                    });

                    loader.remove();
                });
            });
        });
    }

    GetScriptContext(scirptIndex) {
        return this.apis.find(item => item.index === scirptIndex);
    }
}