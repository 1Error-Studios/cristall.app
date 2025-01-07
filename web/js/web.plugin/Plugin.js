class Plugin {
    constructor() {
        this.pluginResources = [];
        
        this.pluginSettings = [];
        this.pluginData = [];
    }

    LoadResources(resources) {
        this.pluginResources = resources;
    }
}