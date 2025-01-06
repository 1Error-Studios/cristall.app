const os = require('os');

const FOLDERS_PATH = {
    'company': `${os.homedir()}/AppData/Roaming/1Error Studios`,
    'app': `${os.homedir()}/AppData/Roaming/1Error Studios/Cristall`,
    'plugins': `${os.homedir()}/AppData/Roaming/1Error Studios/Cristall/plugins`,
    'files': `${os.homedir()}/AppData/Roaming/1Error Studios/Cristall/files`,
}

const FILES_PATH = {
    'log_file': `${os.homedir()}/AppData/Roaming/1Error Studios/Cristall/log.json`
}

exports.FOLDERS_PATH = FOLDERS_PATH;
exports.FILES_PATH = FILES_PATH;