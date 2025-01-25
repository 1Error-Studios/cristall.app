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
        Log.MakeNewNote('WorkspacesLoader.DropParsedFile()', 'Dropped all workspace.json file content');

        return JSON.parse(fs.readFileSync(WORKSPACE_PATH));
    }

    /**
     * Drop new workspaces content to file
     * 
     * @param {Object} workspaces 
     */
    static WriteChanges(workspaces) {
        fs.writeFileSync(WORKSPACE_PATH, JSON.stringify(workspaces, null, '\t'));

        Log.MakeNewNote('WorkspacesLoader.WriteChanges(workspaces)', 'Writed new data to workspaces.json file');
    }

    /**
     * Validate workspaces.json file
     */
    static ValidateFile() {
        let workspaces = WorkspacesLoader.DropParsedFile();

        if (!workspaces.active && workspaces.content.length > 0) {
            workspaces.active = workspaces.content[0].index;
        }

        WorkspacesLoader.WriteChanges(workspaces);

        Log.MakeNewNote('WorkspacesLoader.ValidateFile()', 'SUCCESS: Validated workspaces file');
    }
}

exports.WorkspacesLoader = WorkspacesLoader;