const { dev_mode } = require('../../meta.json');
const { BrowserWindow } = require('electron');
const { Log } = require('../log/Log.js');

class Window {
    constructor() {
        this.window = null;

        this.currentWidth = 800;
        this.currentHeight = 600;

        this.additionalOptions = {};

        this.title = '';
    }

    /**
     * Get all parameters for `window`
     * 
     * CAN BE LOGGED
     * @param {number} width 
     * @param {number} height 
     * @param {string} title 
     */
    FullWindowSetup(width, height, title) {
        if (typeof width !== "number" || width > 1920 || width < 800) {
            if (dev_mode) {
                Log.MakeNewNote('Window.FullWindowSetup(width, height, title)', 'FATAL: width is not number or has incorrect value!');
            }

            return;
        }

        if (typeof height !== "number" || height > 1080 || height < 600) {
            if (dev_mode) {
                Log.MakeNewNote('Window.FullWindowSetup(width, height, title)', 'FATAL: height is not number or has incorrect value!');
            }

            return;
        }

        if (typeof title !== "string") {
            if (dev_mode) {
                Log.MakeNewNote('Window.FullWindowSetup(width, height, title)', 'FATAL: title is not string!');
            }

            return;
        }

        this.currentWidth = width;
        this.currentHeight = height;
        this.title = title;

        if (dev_mode) {
            Log.MakeNewNote('Window.FullWindowSetup(width, height, title)', 'INFO: successfully compleate setup!');
        }
    }

    /**
     * Changing only width
     * 
     * CAN BE LOGGED
     * @param {number} width 
     */
    WidthSetup(width) {
        if (typeof width !== "number" || width > 1920 || width < 800) {
            if (dev_mode) {
                Log.MakeNewNote('Window.WidthSetup(width)', 'FATAL: width is not number or has incorrect value!');
            }

            return;
        }

        this.currentWidth = width;

        if (dev_mode) {
            Log.MakeNewNote('Window.WidthSetup(width)', 'INFO: successfully changed width!');
        }
    }

    /**
     * Changing only height
     * 
     * CAN BE LOGGED
     * @param {number} height 
     */
    HeightSetup(height) {
        if (typeof height !== "number" || height > 1080 || height < 600) {
            if (dev_mode) {
                Log.MakeNewNote('Window.HeightSetup(height)', 'FATAL: height is not number or has incorrect value!');
            }

            return;
        }

        this.currentHeight = height;

        if (dev_mode) {
            Log.MakeNewNote('Window.HeightSetup(height)', 'INFO: successfully changed height!');
        }
    }

    /**
     * Changing only title
     * 
     * CAN BE LOGGED
     * @param {string} title 
     */
    TitleSetup(title) {
        if (typeof title !== "string") {
            if (dev_mode) {
                Log.MakeNewNote('Window.TitleSetup(title)', 'FATAL: title is not string!');
            }

            return;
        }

        this.title = title;

        if (dev_mode) {
            Log.MakeNewNote('Window.TitleSetup(title)', 'INFO: successfully changed title!');
        }
    }

    /**
     * Add more setting to window
     * 
     * @param {Object} additionalOptions 
     */
    SetupAdditionalOptions(additionalOptions) {
        if (typeof additionalOptions === 'object' && Array.isArray()) {
            if (dev_mode) {
                Log.MakeNewNote('Window.SetupAdditionalOptions(additionalOptions)', 'FATAL: additionalOptions is not JS.Object type!');
            }

            return;
        }

        this.additionalOptions = additionalOptions;

        if (dev_mode) {
            Log.MakeNewNote('Window.SetupAdditionalOptions(additionalOptions)', 'INFO: applied new additionalOptions to window!');
        }
    }

    /**
     * Creating new instance of Electron.BrowserWindow
     * 
     * @returns {null}
     */
    CreateWindow() {
        if (typeof this.currentWidth !== "number" || this.currentWidth > 1920 || this.currentWidth < 800) {
            if (dev_mode) {
                Log.MakeNewNote('Window.CreateWindow()', 'FATAL: width is not number or has incorrect value!');
            }

            return;
        }

        if (typeof this.currentHeight !== "number" || this.currentHeight > 1080 || this.currentHeight < 600) {
            if (dev_mode) {
                Log.MakeNewNote('Window.CreateWindow()', 'FATAL: height is not number or has incorrect value!');
            }

            return;
        }

        if (typeof this.title !== "string" || this.title.length === 0) {
            if (dev_mode) {
                Log.MakeNewNote('Window.CreateWindow()', 'FATAL: height is not string!');
            }

            return;
        }

        if (this.window instanceof BrowserWindow) {
            if (dev_mode) {
                Log.MakeNewNote('Window.CreateWindow()', 'ERROR: window already exist!');
            }

            return;
        }

        this.window = new BrowserWindow({
            width: this.currentWidth,
            height: this.currentHeight,
            title: this.title,
            ...this.additionalOptions
        });

        if (dev_mode) {
            Log.MakeNewNote('Window.CreateWindow()', 'INFO: successfully created window instance!');
        }
    }

    /**
     * Dropping instance of Electron.BrowserWindow
     * 
     * @returns {null|BrowserWindow}
     */
    DropWindow() {
        if (!(this.window instanceof BrowserWindow)) {
            if (dev_mode) {
                Log.MakeNewNote('Window.CreateWindow()', 'FATAL: could not find any window instances!');
            }

            return;
        }

        return this.window;
    }
}

exports.Window = Window;