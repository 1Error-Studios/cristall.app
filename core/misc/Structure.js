const os = require('os');

const FOLDERS_PATH = {
    'company': `${os.homedir()}/AppData/Roaming/1Error Studios`,
    'app': `${os.homedir()}/AppData/Roaming/1Error Studios/Cristall`,
    'plugins': `${os.homedir()}/AppData/Roaming/1Error Studios/Cristall/plugins`,
    'workspaces': `${os.homedir()}/AppData/Roaming/1Error Studios/Cristall/workspaces`,
    'unworkspaced': `${os.homedir()}/AppData/Roaming/1Error Studios/Cristall/workspaces/unworkspaced`
}

const FILES_PATH = [
    {
        name: 'log_file',
        path: `${FOLDERS_PATH.app}/log.json`,
        default_content: '[]'
    },
    {
        name: 'workspaces',
        path: `${FOLDERS_PATH.app}/workspaces.json`,
        default_content: JSON.stringify({
            active: null,
            content: [
                {
                    id: 0,
                    name: 'unworkspaced',
                    files: []
                }
            ]
        }, null, '\t')
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
                width: 1200,
                height: 800
            },
            use_system_theme: false,
            theme: 'dark',
            font: 'Outfit',
            main_color: 'red',
            auto_update: true,
            use_workspaces: true,
            language: Intl.DateTimeFormat().resolvedOptions().locale
        }, null, '\t')
    }
]

exports.FOLDERS_PATH = FOLDERS_PATH;
exports.FILES_PATH = FILES_PATH;