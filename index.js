const { app, BrowserWindow, ipcMain } = require('electron');
const { join } = require('path');

const { FOLDERS_PATH, FILES_PATH } = require('./core/misc/Structure.js');
const { Window } = require('./core/window/Window.js');
const { Checker } = require('./core/filesystem/Checker.js');
const { Log } = require('./core/log/Log.js');
const { PluginManager } = require('./core/plugin/PluginManager.js');
const { Loader } = require('./core/filesystem/Loader.js');
const { Settings } = require('./core/settings/Settings.js');
const { WorkspacesLoader } = require('./core/workspaces/Loader.js');

Checker.CheckFoldersExist(Object.values(FOLDERS_PATH));
Checker.CheckFilesExist(FILES_PATH);

Log.ClearLog();

const settingsManager = new Settings();
settingsManager.LoadSettings(Settings.ParseSettings());

const window = new Window();
let pluginManager = new PluginManager();

pluginManager.CheckPlugins();

const createWindow = () => {
    window.TitleSetup('Cristall');
    window.WidthSetup(settingsManager.GetField('window').width);
    window.HeightSetup(settingsManager.GetField('window').height);

    window.SetupAdditionalOptions({
        frame: false,
        autoHideMenuBar: true,
        minHeight: 600,
        minWidth: 800,
        webPreferences: {
            preload: join(__dirname, 'preload.js')
        }
    });
    window.CreateWindow();

    window.DropWindow().loadFile('./web/main.html');

    window.DropWindow().on('resize', () => {
        let windowSettings = settingsManager.GetField('window');

        windowSettings.width = window.DropWindow().getContentBounds().width;
        windowSettings.height = window.DropWindow().getContentBounds().height;

        settingsManager.ChangeField('window', windowSettings);
    });
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

app.on('quit', (event) => {
    settingsManager.UploadSettings();
});

// signals

ipcMain.handle('app:close', event => {
    app.quit();
});

ipcMain.handle('app:minimize', event => {
    window.DropWindow().minimize();
});

ipcMain.handle('app:maximize', event => {
    window.DropWindow().setFullScreen(!window.DropWindow().isFullScreen());
});

ipcMain.handle('plugins:upload', event => {
    return pluginManager.UploadPlugins();
});

ipcMain.handle('plugins:load:script', (event, args) => {
    let filepath = `${FOLDERS_PATH.plugins}/${args.pluginName.toLowerCase().replace(new RegExp(" ", "ig"), "_")}.plugin/${args.file}`;

    return filepath;
});

ipcMain.handle('log:make-note', (event, args) => {
    if (settingsManager.GetField('dev_mode')) {
        Log.MakeNewNote(args.title, args.message);
    }
});

ipcMain.handle('files:load-all', (event) => {
    return Loader.LoadAllFiles();
});

ipcMain.handle('files:load-file', (event, filename) => {
    return Loader.LoadFile(filename);
});