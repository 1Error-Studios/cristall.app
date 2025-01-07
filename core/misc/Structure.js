const os = require('os');

const FOLDERS_PATH = {
    'company': `${os.homedir()}/AppData/Roaming/1Error Studios`,
    'app': `${os.homedir()}/AppData/Roaming/1Error Studios/Cristall`,
    'plugins': `${os.homedir()}/AppData/Roaming/1Error Studios/Cristall/plugins`,
    'files': `${os.homedir()}/AppData/Roaming/1Error Studios/Cristall/files`
}

const FILES_PATH = [
    {
        name: 'log_file',
        path: `${FOLDERS_PATH.app}/log.json`,
        default_content: '[]'
    },
    {
        name: 'file_repository',
        path: `${FOLDERS_PATH.files}/file_repository.json`,
        default_content: '[]'
    },
    {
        name: 'hotkeys',
        path: `${FOLDERS_PATH.app}/hotkeys.json`,
        default_content: '[]'
    },
    {
        name: 'settings',
        path: `${FOLDERS_PATH.app}/settings.json`,
        default_content: JSON.stringify({
            dev_mode: false,
            window: {
                width: 800,
                height: 600
            },
            theme: 'dark'
        }, null, '\t')
    }
]

exports.FOLDERS_PATH = FOLDERS_PATH;
exports.FILES_PATH = FILES_PATH;