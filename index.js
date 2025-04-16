const { app, BrowserWindow, ipcMain } = require('electron');
const { join } = require('path');
const fs = require('fs');

const { FOLDERS_PATH, FILES_PATH } = require('./core/misc/Structure.js');
const { Window } = require('./core/window/Window.js');
const { Checker } = require('./core/filesystem/Checker.js');
const { Log } = require('./core/log/Log.js');
const { PluginManager } = require('./core/plugin/PluginManager.js');
const { Loader } = require('./core/filesystem/Loader.js');
const { Settings } = require('./core/settings/Settings.js');
const { WorkspacesLoader } = require('./core/workspaces/Loader.js');
const { signalWorker } = require('./core/signal/SignalWorker.js');

Checker.CheckFoldersExist(Object.values(FOLDERS_PATH));
Checker.CheckFilesExist(FILES_PATH);

Log.ClearLog();

const settingsManager = new Settings();
settingsManager.LoadSettings(Settings.ParseSettings());

WorkspacesLoader.ValidateFile();

const window = new Window();
let consoleWindow;
const pluginManager = new PluginManager();

pluginManager.CheckPlugins();

const createWindow = () => {
    window.TitleSetup('Cristall');
    window.WidthSetup(settingsManager.GetField('window').width);
    window.HeightSetup(settingsManager.GetField('window').height);

    window.SetupAdditionalOptions({
        frame: false,
        autoHideMenuBar: true,
        minHeight: 800,
        minWidth: 1200,
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

function OpenConsole() {
    consoleWindow = new Window();

    consoleWindow.TitleSetup('Cristall.Console');
    consoleWindow.WidthSetup(1000);
    consoleWindow.HeightSetup(700);

    consoleWindow.SetupAdditionalOptions({
        frame: false,
        autoHideMenuBar: true,
        minHeight: 700,
        minWidth: 1000,
        webPreferences: {
            preload: join(__dirname, 'preload.js')
        }
    });
    consoleWindow.CreateWindow();

    consoleWindow.DropWindow().loadFile('./web/console.html');
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
    Log.MakeNewNote(args.title, args.message);
});

ipcMain.handle('files:load-all', (event) => {
    return JSON.stringify(WorkspacesLoader.DropParsedFile());
});

ipcMain.handle('files:load-file', (event, options) => {
    return Loader.LoadFile(options.id, options.filename);
});

ipcMain.handle('files:create-new', (event, options) => {
    WorkspacesLoader.AddNewFile(JSON.parse(options));
});

ipcMain.handle('files:save', (event, options) => {
    WorkspacesLoader.UpdateFile(JSON.parse(options));
});

ipcMain.handle('workspaces:load-all', (event) => {
    return WorkspacesLoader.DropParsedFile();
});

ipcMain.handle('settings:load-all', (event) => {
    return settingsManager.DropSettings();
});

ipcMain.handle('settings:get-version', (event) => {
    return JSON.parse(fs.readFileSync('./meta.json').toString()).version;
});

ipcMain.handle('settings:save', (event, settings) => {
    settings = JSON.parse(settings);

    settingsManager.LoadSettings(settings);
    settingsManager.UploadSettings();
});

ipcMain.handle('localisation:load-prebuilt', (event) => {
    return JSON.stringify({
        'en-US': JSON.parse(fs.readFileSync('./localisation/en-US.json').toString()),
        'ru-RU': JSON.parse(fs.readFileSync('./localisation/ru-RU.json').toString()),
        'kn-KN': JSON.parse(fs.readFileSync('./localisation/kn-KN.json').toString())
    });
});

ipcMain.handle('console:open', (event) => {
    if (!signalWorker.Check('isConsoleOpenned')) {
        OpenConsole();
        signalWorker.On('isConsoleOpenned');
    }
    else {
        consoleWindow.DropWindow().focus();
    }
});

ipcMain.handle('console:minimize', event => {
    consoleWindow.DropWindow().minimize();
});

ipcMain.handle('console:maximize', event => {
    consoleWindow.DropWindow().setFullScreen(!consoleWindow.DropWindow().isFullScreen());
});

ipcMain.handle('console:close', event => {
    consoleWindow.DropWindow().close();
    signalWorker.Off('isConsoleOpenned');
});

ipcMain.handle('console:load-messages', event => {
    return JSON.stringify(Log.DropFile());
});

ipcMain.handle('console:command:invisible', (event, status) => {
    window.DropWindow().webContents.send('invisible', status);
});