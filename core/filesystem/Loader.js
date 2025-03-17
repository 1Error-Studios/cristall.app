const { FOLDERS_PATH, FILES_PATH } = require('../misc/Structure.js');
const { Log } = require('../log/Log.js');
const fs = require('fs');

const WORKSPACES_PATH = FILES_PATH.find(item => item.name === 'workspaces').path;

class Loader {
    /**
     * Read system file
     * 
     * @param {number} workspaceId
     * @param {string} filename 
     * @returns {string}
     */
    static LoadFile(workspaceId, filename) {
        let workspaces = JSON.parse(fs.readFileSync(WORKSPACES_PATH).toString());
        let workspace = workspaces.content.find(item => item.id === workspaceId);

        console.log(workspace)

        if (!workspace) {
            Log.MakeNewNote('Loader.LoadFile(filename)', `FATAL: workspace with @id [${workspaceId}] not found. SKIPPED.`);

            return;
        }

        if (!workspace.files.find(item => item.filename === filename)) {
            Log.MakeNewNote('Loader.LoadFile(filename)', `WARNING: file with @filename [${filename}] not found. SKIPPED.`);

            return;
        }

        if (!fs.existsSync(FOLDERS_PATH['workspaces'] + `/${workspace.name}/${filename}`)) {
            Log.MakeNewNote('Loader.LoadFile(filename)', `WARNING: @file with name [${filename}] in @workspace [${workspace.name}] not found.`);

            return;
        }

        let content = fs.readFileSync(FOLDERS_PATH['workspaces'] + `/${workspace.name}/${filename}`).toString();

        return content;
    }

    /**
     * Get all files
     * 
     * @returns {Array}
     */
    static LoadAllFiles() {
        let files = fs.readdirSync(FOLDERS_PATH['workspaces'], {
            withFileTypes: true
        });

        files = files
            .filter(dirent => !dirent.isDirectory())
            .map(dirent => dirent.name);

        return files;
    }
}

exports.Loader = Loader;