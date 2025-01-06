const fs = require('fs');
const { FILES_PATH } = require('../misc/Structure.js');

let LOG_PATH = FILES_PATH.find(item => item.name === 'log_file').path;

class Log {
    /**
     * Create new log collision
     * 
     * @param {string} title 
     * @param {string} message 
     * @returns {null}
     */
    static MakeNewNote(title, message) {
        const liveStack = JSON.parse(fs.readFileSync(LOG_PATH));

        liveStack.push({
            time: Date.now(),
            title,
            message
        });

        fs.writeFileSync(LOG_PATH, JSON.stringify(liveStack, null, '\t'));
    }

    /**
     * Clean up log file
     * 
     * @returns {null}
     */
    static ClearLog() {
        fs.writeFileSync(LOG_PATH, '[]');
    }
}

exports.Log = Log;