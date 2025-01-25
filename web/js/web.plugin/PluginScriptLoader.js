class ScriptLoader {
    constructor() {}

    LoadScripts(scriptResource, fire) {
        return new Promise((resolve, reject) => {
            scriptResource.entries.forEach((script, index) => {
                window.electronAPI.invoke('plugins:load:script', {
                    pluginName: `${pluginLoader.GetPluginData(fire).data.name}.${pluginLoader.GetPluginData(fire).data.com}`,
                    file: script.file
                }).then(data => {
                    let loader = document.createElement('script');
                    loader.setAttribute('src', data);
    
                    document.head.append(loader);
    
                    loader.addEventListener('load', () => {
                        let executor = new Executor();
    
                        executor.LoadAPI(API);
                        executor.LoadContext(fire);
                        executor.LoadScripts(Module);
    
                        GlobalProfiler.Push(executor);
    
                        loader.remove();

                        if (index === scriptResource.entries.length - 1) {
                            return resolve();
                        }
                    });
                });
            });
        });
    }

    GetScriptContext(scirptIndex) {
        return this.apis.find(item => item.index === scirptIndex);
    }
}