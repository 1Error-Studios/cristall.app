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
                Log.MakeNewNote('PluginManager.GetPluginInfo(id)', 'ERROR: couldn\'t read file plugin.js. JSON parse error.');
            }

            return;
        }
    }
}

exports.PluginManager = PluginManager;