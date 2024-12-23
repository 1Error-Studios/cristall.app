const __Plugin = {
    GetLoadedPlugins: () => {
        return pluginLoader.GetPluginsList();
    },

    GetSharedLib: function () {
        console.log(this);
    }
}