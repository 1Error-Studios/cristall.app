const fs = require('fs');
const { dev_mode } = require('../../meta.json');

class Log {
    constructor() {
        this.liveStack = [];

        this.filePath = '';
    }

    /**
     * Setup log file location
     * 
     * @param {string} filePath 
     * @returns {null}
     */
    LoadFilePath(filePath) {
        if (typeof filePath !== 'string') {
            return;
        }

        if (!fs.existsSync(filePath)) {
            return;
        }

        this.filePath = filePath;
    }

    /**
     * Load log stack into memory
     * 
     * @returns {null}
     */
    LoadLiveStackFromFile() {
        if (this.filePath.length === 0) {
            return;
        }

        this.liveStack = JSON.parse(fs.readFileSync(this.filePath));
    }

    /**
     * Create new log collision
     * 
     * @param {string} title 
     * @param {string} message 
     * @returns {null}
     */
    MakeNewNote(title, message) {
        if (this.filePath.length === 0) {
            return;
        }

        this.liveStack.push({
            date: Date.now(),
            title,
            message
        });
    }

    /**
     * Clean up log file and live stack
     * 
     * @returns {null}
     */
    ClearLog() {
        if (this.filePath.length === 0) {
            return;
        }

        fs.writeFileSync(this.filePath, '');

        this.liveStack = [];
    }
}

exports.Log = Log;