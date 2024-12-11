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
            if (!fs.existsSync(item)) {
                let content = '';
                let extension = item.split('.')[item.split('.').length - 1];

                switch(extension) {
                    case "json":
                        content = '[]';
                        break;
                    default:
                        content = '';
                        break;
                }

                fs.writeFileSync(item, content);
            }
        });
    }
}

exports.Checker = Checker;