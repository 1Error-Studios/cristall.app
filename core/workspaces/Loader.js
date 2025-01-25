const { Log } = require('../log/Log.js');
const { FILES_PATH } = require('../misc/Structure.js');
const fs = require('fs');

let WORKSPACE_PATH = FILES_PATH.find(item => item.name === 'workspaces').path;

class WorkspacesLoader {
    /**
     * Load workspaces.json file content
     * 
     * @returns {Object}
     */
    static DropParsedFile() {
        Log.MakeNewNote('WorkspacesLoader.DropParsedFile()', 'Dropped all wworkspace.json file content');

        return JSON.parse(fs.readFileSync(WORKSPACE_PATH));
    }
}

exports.WorkspacesLoader = WorkspacesLoader;