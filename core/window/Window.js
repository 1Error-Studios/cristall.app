const { dev_mode } = require('../../meta.json');
const { BrowserWindow } = require('electron');

class Window {
    constructor() {
        this.window = null;

        this.currentWidth = 800;
        this.currentHeight = 600;

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
                // log here
                return;
            }
        }

        if (typeof height !== "number" || height > 1080 || height < 600) {
            if (dev_mode) {
                // log here
                return;
            }
        }

        if (typeof title !== "string") {
            if (dev_mode) {
                // log here
                return;
            }
        }

        this.currentWidth = width;
        this.currentHeight = height;
        this.title = title;

        if (dev_mode) {
            // log here
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
                // log here
                return;
            }
        }

        this.currentWidth = width;

        if (dev_mode) {
            // log here
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
                // log here
                return;
            }
        }

        this.currentHeight = height;

        if (dev_mode) {
            // log here
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
                // log here
                return;
            }
        }

        this.title = title;

        if (dev_mode) {
            // log here
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
                // log here
                return;
            }
        }

        if (typeof this.currentHeight !== "number" || this.currentHeight > 1080 || this.currentHeight < 600) {
            if (dev_mode) {
                // log here
                return;
            }
        }

        if (typeof this.title !== "string" || this.title.length === 0) {
            if (dev_mode) {
                // log here
                return;
            }
        }

        if (this.window instanceof BrowserWindow) {
            if (dev_mode) {
                // log here
                return;
            }
        }

        this.window = new BrowserWindow({
            width: this.currentHeight,
            height: this.currentHeight,
            title: this.title
        });

        if (dev_mode) {
            // log here
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
                // log here
                return;
            }
        }

        return this.window;
    }
}

exports.Window = Window;