class PluginLoader {
    constructor() {
        this.plugins = [];
        this.parsedPlugins = [];
        this.scriptLoader = null;
    }

    LoadPlugins() {
        return new Promise((resolve, reject) => {
            window.electronAPI.invoke('plugins:upload').then(data => {
                this.plugins = data;

                return resolve();
            });
        });
    }

    ParseAndApplyPlugins() {
        this.plugins.forEach((plugin, index) => {
            if (!plugin.root) {
                let rootElement = document.createElement('div');
                let styleRootElement = document.createElement('style');
                let fire = UUID();
                let uniqueId = `${fire}@${plugin.data.name}.${plugin.data.com}.root`;

                rootElement.setAttribute('plugin-meta-id', uniqueId);
                styleRootElement.setAttribute('plugin-meta-style-id', uniqueId);

                document.querySelector('[data-sector-id="plugins"]').append(rootElement);
                document.head.append(styleRootElement);

                TakeNote('PluginLoader.ParseAndApplyPlugins()', `INFO: Applied plugin [${plugin.data.name}.${plugin.data.com}] to sector ${uniqueId}`);

                this.plugins[index].root = uniqueId;
                this.plugins[index].fire = fire;

                if (Array.isArray(plugin.resources)) {
                    plugin.resources.forEach(resource => {
                        switch(resource.resource.module_type) {
                            case "scripts":
                                if (this.scriptLoader) {
                                    this.scriptLoader.LoadScripts(resource.resource, fire).then(() => {
                                        LoadOtherSources();
                                    });
                                }
                                else {
                                    LoadOtherSources();
                                }

                                break;
                        }
                    });

                    function LoadOtherSources() {
                        plugin.resources.forEach(resource => {
                            switch(resource.resource.module_type) {
                                case "markup":
                                    resource.resource.elements.forEach(element => {
                                        let parsed = HTMLLoader.PluginToHTMLParse(element, fire);
    
                                        if (parsed instanceof Element) {
                                            document.querySelector(`[plugin-meta-id="${uniqueId}"]`).append(parsed);
                                        }
                                    });
    
                                    TakeNote('PluginLoader.ParseAndApplyPlugins()', `INFO: [${plugin.data.name}.${plugin.data.com}] parsed module [${resource.resource.module_type}] to sector ${uniqueId}`);
                                    TakeNote('PluginLoader.ParseAndApplyPlugins()', `MODULE: $[${resource.resource.module_type}] applied ${resource.resource.elements.length} elements to sector ${uniqueId}`);
    
                                    break;
                                case "styles":
                                    resource.resource.styles.forEach(style => {
                                        let parsed = CSSLoader.PluginToCSSParse(style, fire);
    
                                        if (parsed.length > 0) {
                                            document.querySelector(`[plugin-meta-style-id="${uniqueId}"]`).textContent += parsed;
                                        }
                                    });
    
                                    TakeNote('PluginLoader.ParseAndApplyPlugins()', `INFO: [${plugin.data.name}.${plugin.data.com}] parsed module [${resource.resource.module_type}] to sector ${uniqueId}`);
                                    TakeNote('PluginLoader.ParseAndApplyPlugins()', `MODULE: $[${resource.resource.module_type}] applied ${resource.resource.styles.length} style blocks to sector ${uniqueId}`);
    
                                    break;
                                default:
                                    TakeNote('PluginLoader.ParseAndApplyPlugins()', `INFO: [${plugin.data.name}.${plugin.data.com}] skipped module with type [${resource.resource.module_type}]`);
                            }
                        });
                    }
                }
                else {
                    TakeNote('PluginLoader.ParseAndApplyPlugins()', `Found 0 resources to sector ${uniqueId}`);
                }
            }
        });
    }

    SetScriptLoaderLink(loader) {
        this.scriptLoader = loader;
    }

    GetScriptLoader() {
        return this.scriptLoader;
    }

    GetPluginData(fire) {
        return this.plugins.find(item => item.fire === fire);
    }
    
    GetPluginsList() {
        return this.plugins.map(function (item) {
            return {
                name: item.data.name,
                fire: item.fire
            }
        });
    }
}