class PluginLoader {
    constructor() {
        this.plugins = [];
    }

    LoadPlugins() {
        return window.electronAPI.invoke('plugins:upload')
    }

    ParseAndApplyPlugins() {

    }
}