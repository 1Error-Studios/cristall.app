const fs = require('fs');

const { FOLDERS_PATH } = require('../misc/Structure.js');
const { Log } = require('../log/Log.js');
const { dev_mode } = require('../../meta.json');

class PluginManager {
    constructor() {
        this.plugins = [];
    }

    /**
     * List all installed plugins
     */
    CheckPlugins() {
        let pluginsFolders = fs.readdirSync(FOLDERS_PATH['plugins'], {
            withFileTypes: true
        });

        pluginsFolders = pluginsFolders
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        this.plugins = pluginsFolders;

        if (dev_mode) {
            Log.MakeNewNote('PluginManager.CheckPlugins()', `SUCCESS: was finded ${this.plugins.length} plugins.`);
        }
    }

    /**
     * Get all plugin info from `plugin.json` file
     * 
     * @param {string} id 
     * @returns {null|Object}
     */
    GetPluginInfo(id) {
        if (typeof id !== 'string') {
            if (dev_mode) {
                Log.MakeNewNote('PluginManager.GetPluginInfo(id)', 'ERROR: @id isn\'t string');
            }

            return;
        }

        if (!this.plugins.includes(id)) {
            if (dev_mode) {
                Log.MakeNewNote('PluginManager.GetPluginInfo(id)', `ERROR: could\'t find any plugins with @id: ${id}`);
            }

            return;
        }

        let pluginInfoFilePath = FOLDERS_PATH['plugins'] + `/${id}/plugin.json`;

        try {
            let pluginInfoParsed = JSON.parse(fs.readFileSync(pluginInfoFilePath));

            return pluginInfoParsed;
        } catch (error) {
            if (dev_mode) {
                Log.MakeNewNote('PluginManager.GetPluginInfo(id)', 'ERROR: couldn\'t read file plugin.json. JSON parse error.');
            }

            return;
        }
    }

    /**
     * Get all plugin resources from main folder
     * 
     * @param {string} id 
     * @returns {null|Object}
     */
    GetAllPluginResources(id) {
        if (typeof id !== 'string') {
            if (dev_mode) {
                Log.MakeNewNote('PluginManager.GetAllPluginResources(id)', 'ERROR: @id isn\'t string');
            }

            return;
        }

        if (!this.plugins.includes(id)) {
            if (dev_mode) {
                Log.MakeNewNote('PluginManager.GetAllPluginResources(id)', `ERROR: could\'t find any plugins with @id: ${id}`);
            }

            return;
        }

        let resources = [];

        let pluginPath = FOLDERS_PATH['plugins'] + `/${id}`;

        let pluginResources = fs.readdirSync(pluginPath, {
            withFileTypes: true
        });

        pluginResources = pluginResources
            .filter(dirent => !dirent.isDirectory())
            .map(dirent => dirent.name);

        pluginResources.forEach(item => {
            if (item.includes('.json') && item != 'plugin.json') {
                resources.push({
                    'resource_name': item,
                    'resource': JSON.parse(fs.readFileSync(`${pluginPath}/${item}`).toString())
                });
            }
        });

        return resources;
    }

    /**
     * Returns all parsable data
     * 
     * @returns {Array}
     */
    UploadPlugins() {
        let uploadData = [];

        this.plugins.forEach(item => {
            let plugin = {
                data: this.GetPluginInfo(item),
                resources: this.GetAllPluginResources(item)
            }

            uploadData.push(plugin);
        });

        return uploadData;
    }
}

exports.PluginManager = PluginManager;