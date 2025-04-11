const { Log } = require('../log/Log.js');
const { FILES_PATH, FOLDERS_PATH } = require('../misc/Structure.js');
const fs = require('fs');

let WORKSPACE_PATH = FILES_PATH.find(item => item.name === 'workspaces').path;
let WORKSPACE_DIR = FOLDERS_PATH['workspaces'];

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

    /**
     * Create new file
     * 
     * @param {object} options
     * @param {string} [options.name]
     * @param {string} [options.filename]
     * @param {number} [options.id]
     */
    static AddNewFile(options) {
        let workspaces = JSON.parse(fs.readFileSync(WORKSPACE_PATH).toString());
        let workspace = workspaces.content.find(item => item.id === options.id);

        if (!workspace) {
            Log.MakeNewNote('WorkspacesLoader.AddNewFile(options)', 'FATAL: workspace with id @options.id not found. SKIPPED');

            return;
        }

        if (workspace.files.find(item => item.name === options.name)) {
            Log.MakeNewNote('WorkspacesLoader.AddNewFile(options)', 'FATAL: file with name @options.name already exist. SKIPPED');

            return;
        }

        fs.writeFileSync(`${WORKSPACE_DIR}/${workspace.name}/${options.filename}`, '');

        workspace.files.push({
            name: options.name,
            filename: options.filename
        });

        Log.MakeNewNote('WorkspacesLoader.AddNewFile(options)', `SUCCESS: successfully create file at workspace with @id [${options.id}]`);

        this.WriteChanges(workspaces);
    }

    /**
     * Create new file
     * 
     * @param {object} options
     * @param {string} [options.filename]
     * @param {number} [options.id]
     * @param {string} [options.content]
     */
    static UpdateFile(options) {
        let workspaces = JSON.parse(fs.readFileSync(WORKSPACE_PATH).toString());
        let workspace = workspaces.content.find(item => item.id === options.id);
        let file = workspace.files.find(item => item.filename === options.filename);

        if (!workspace) {
            Log.MakeNewNote('WorkspacesLoader.UpdateFile(options)', `FATAL: workspace with id ${options.id} not found. SKIPPED`);

            return;
        }

        if (!file) {
            Log.MakeNewNote('WorkspacesLoader.UpdateFile(options)', `FATAL: file with filename ${options.filename} not found. SKIPPED`);

            return;
        }

        fs.writeFileSync(`${WORKSPACE_DIR}/${workspace.name}/${options.filename}`, options.content);
    }
}

exports.WorkspacesLoader = WorkspacesLoader;