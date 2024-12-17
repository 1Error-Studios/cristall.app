class PluginLoader {
    constructor() {
        this.plugins = [];
    }

    LoadPlugins(callback) {
        window.electronAPI.invoke('plugins:upload').then(data => {
            this.plugins = data;

            callback();
        });
    }

    ParseAndApplyPlugins() {
        this.plugins.forEach((plugin, index) => {
            if (!plugin.root) {
                let rootElement = document.createElement('div');
                let uniqueId = `${UUID()}@${plugin.data.name}.${plugin.data.com}.root`;

                rootElement.setAttribute('plugin-meta-id', uniqueId);

                document.querySelector('[data-sector-id="plugins"]').append(rootElement);

                TakeNote('PluginLoader.ParseAndApplyPlugins()', `INFO: Applied plugin [${plugin.data.name}.${plugin.data.com}] to sector ${uniqueId}`);

                this.plugins[index].root = uniqueId;

                if (Array.isArray(plugin.resources)) {
                    plugin.resources.forEach(resource => {
                        switch(resource.resource.module_type) {
                            case "markup":
                                resource.resource.elements.forEach(element => {
                                    let parsed = HTMLLoader.PluginToHTMLParse(element);

                                    if (parsed instanceof Element) {
                                        document.querySelector(`[plugin-meta-id="${uniqueId}"]`).append(parsed);
                                    }
                                });

                                TakeNote('PluginLoader.ParseAndApplyPlugins()', `INFO: [${plugin.data.name}.${plugin.data.com}] parsed module [${resource.resource.module_type}] to sector ${uniqueId}`);
                                TakeNote('PluginLoader.ParseAndApplyPlugins()', `MODULE: $[${resource.resource.module_type}] applied ${resource.resource.elements.length} elements to sector ${uniqueId}`);

                                break;
                            default:
                                TakeNote('PluginLoader.ParseAndApplyPlugins()', `INFO: [${plugin.data.name}.${plugin.data.com}] skipped module with type [${resource.resource.module_type}]`);
                        }
                    });
                }
                else {
                    TakeNote('PluginLoader.ParseAndApplyPlugins()', `Found 0 resources to sector ${uniqueId}`);
                }
            }
        });
    }
}