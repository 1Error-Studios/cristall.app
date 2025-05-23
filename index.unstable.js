/// [Modules] ///
const { app, BrowserWindow } = require('electron');
const { join } = require('path');

/// [Cristall.core] ///
const { Window } = require('./core/window/Window.js');

let window = new Window();

app.whenReady().then(() => {
    CreateWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            CreateWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

/// [Functions] ///
function CreateWindow() {
    window.TitleSetup('Cristall.app');
    window.WidthSetup(800);
    window.HeightSetup(600);

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

    window.DropWindow().loadFile('./unstable/web/index.unstable.html');
}