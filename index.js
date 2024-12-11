const { app, BrowserWindow } = require('electron');
const os = require('os');

const { Window } = require('./core/window/Window.js');
const { Log } = require('./core/log/Log.js');
const { Checker } = require('./core/filesystem/Checker.js');

const FOLDERS_PATH = {
    'company': `${os.homedir()}/AppData/Roaming/1Error Studios`,
    'app': `${os.homedir()}/AppData/Roaming/1Error Studios/Crystall`
}

const FILES_PATH = {
    'log_file': `${os.homedir()}/AppData/Roaming/1Error Studios/Crystall/log.json`
}

Checker.CheckFoldersExist(Object.values(FOLDERS_PATH));
Checker.CheckFilesExist(Object.values(FILES_PATH));

const window = new Window();
const logger = new Log();

logger.LoadFilePath(FILES_PATH.log_file);

const createWindow = () => {
    window.TitleSetup('Crystall');
    window.SetupAdditionalOptions({
        frame: false,
        autoHideMenuBar: true
    });
    window.CreateWindow();

    window.DropWindow().loadFile('./web/main.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});