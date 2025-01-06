const fs = require('fs');

class Checker {
    /**
     * Checkout folders (and create if it doesn't exist)
     * 
     * @param {Array} folders
     */
    static CheckFoldersExist(folders) {
        if (!Array.isArray(folders)) {
            return;
        }

        if (folders.length === 0) {
            return;
        }

        folders.forEach(item => {
            if (!fs.existsSync(item)) {
                fs.mkdir(item, (error) => {
                    if (error) {
                        console.error(error.message);
                    }
                });
            }
        });
    }

    /**
     * Checkout files (and create if it doesn't exist)
     * 
     * @param {Array} files
     */
    static CheckFilesExist(files) {
        if (!Array.isArray(files)) {
            return;
        }

        if (files.length === 0) {
            return;
        }

        files.forEach(item => {
            if (!fs.existsSync(item.path)) {
                fs.writeFileSync(item.path, item.default_content);
            }
        });
    }
}

exports.Checker = Checker;