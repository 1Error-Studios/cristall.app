const fs = require('fs');
const { dev_mode } = require('../../meta.json');
const { FILES_PATH } = require('../misc/Structure.js');

class Log {
    /**
     * Create new log collision
     * 
     * @param {string} title 
     * @param {string} message 
     * @returns {null}
     */
    static MakeNewNote(title, message) {
        const liveStack = JSON.parse(fs.readFileSync(FILES_PATH['log_file']));

        liveStack.push({
            date: Date.now(),
            title,
            message
        });

        fs.writeFileSync(FILES_PATH['log_file'], JSON.stringify(liveStack, null, '\t'));
    }

    /**
     * Clean up log file
     * 
     * @returns {null}
     */
    static ClearLog() {
        fs.writeFileSync(FILES_PATH['log_file'], '[]');
    }
}

exports.Log = Log;