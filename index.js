const { app, BrowserWindow, ipcMain } = require('electron');
const { join } = require('path');

const { FOLDERS_PATH, FILES_PATH } = require('./core/misc/Structure.js');
const { Window } = require('./core/window/Window.js');
const { Checker } = require('./core/filesystem/Checker.js');
const { Log } = require('./core/log/Log.js');
const { PluginManager } = require('./core/plugin/PluginManager.js')

Checker.CheckFoldersExist(Object.values(FOLDERS_PATH));
Checker.CheckFilesExist(Object.values(FILES_PATH));

Log.ClearLog();

const window = new Window();
let pluginManager = new PluginManager();

pluginManager.CheckPlugins();

console.log(pluginManager.GetPluginInfo('core.1error_studios.plugin'));

const createWindow = () => {
    window.TitleSetup('Crystall');
    window.WidthSetup(1200);
    window.HeightSetup(800);
    window.SetupAdditionalOptions({
        frame: false,
        autoHideMenuBar: true,
        minHeight: 600,
        minWidth: 800,
        maxHeight: 1080,
        maxWidth: 1920,
        webPreferences: {
            preload: join(__dirname, 'preload.js')
        }
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

// signals

ipcMain.handle('app:close', event => {
    app.quit();
});

ipcMain.handle('app:minimize', event => {
    window.DropWindow().minimize();
});

ipcMain.handle('app:maximize', event => {
    if (window.DropWindow().isFullScreen()) {
        window.DropWindow().setFullScreen(false);
    } else {
        window.DropWindow().setFullScreen(true);
    }
});