const { FOLDERS_PATH } = require('../misc/Structure.js');
const { Log } = require('../log/Log.js');
const fs = require('fs');

class Loader {
    /**
     * Read system file
     * 
     * @param {string} filename 
     * @returns {null|Object}
     */
    static LoadFile(filename) {
        filename = filename.toLowerCase();
        filename = filename.replace(new RegExp(' ', 'ig'), '_');

        if (!fs.existsSync(FOLDERS_PATH['files'] + `/${filename}`)) {
            Log.MakeNewNote('Loader.LoadFile(filename)', `WARNING: file with name ${filename} not found.`);

            return;
        }

        let content = fs.readFileSync(FOLDERS_PATH['files'] + `/${filename}`).toString();
        let extention = filename.split('.')[filename.split('.').length - 1];

        return { filename, content, extention };
    }

    /**
     * Get all files
     * 
     * @returns {Array}
     */
    static LoadAllFiles() {
        let files = fs.readdirSync(FOLDERS_PATH['files'], {
            withFileTypes: true
        });

        files = files
            .filter(dirent => !dirent.isDirectory())
            .map(dirent => dirent.name);

        return files;
    }
}

exports.Loader = Loader;