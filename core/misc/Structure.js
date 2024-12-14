const os = require('os');

const FOLDERS_PATH = {
    'company': `${os.homedir()}/AppData/Roaming/1Error Studios`,
    'app': `${os.homedir()}/AppData/Roaming/1Error Studios/Crystall`,
    'plugins': `${os.homedir()}/AppData/Roaming/1Error Studios/Crystall/plugins`
}

const FILES_PATH = {
    'log_file': `${os.homedir()}/AppData/Roaming/1Error Studios/Crystall/log.json`
}

exports.FOLDERS_PATH = FOLDERS_PATH;
exports.FILES_PATH = FILES_PATH;