const { app, BrowserWindow } = require('electron');

const { FOLDERS_PATH, FILES_PATH } = require('./core/misc/Structure.js');
const { Window } = require('./core/window/Window.js');
const { Checker } = require('./core/filesystem/Checker.js');

Checker.CheckFoldersExist(Object.values(FOLDERS_PATH));
Checker.CheckFilesExist(Object.values(FILES_PATH));

const window = new Window();

const createWindow = () => {
    window.TitleSetup('Crystall');
    window.SetupAdditionalOptions({
        frame: false,
        autoHideMenuBar: true,
        minHeight: 600,
        minWidth: 800,
        maxHeight: 1080,
        maxWidth: 1920
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