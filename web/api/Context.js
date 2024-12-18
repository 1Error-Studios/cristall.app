const __Context = {
    GetContext: (context) => {
        return pluginLoader.GetPluginData(context).root;
    }
}