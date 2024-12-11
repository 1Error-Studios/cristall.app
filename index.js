const { app, BrowserWindow } = require('electron');

const { Window } = require('./core/window/Window.js');

const window = new Window();

const createWindow = () => {
    window.TitleSetup('Crystall');
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