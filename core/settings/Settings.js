const { Log } = require('../log/Log.js');
const { FILES_PATH } = require('../misc/Structure.js');
const fs = require('fs');

const SETTINGS_FILE = FILES_PATH.find(item => item.name === 'settings');

class Settings {
    constructor() {
        this.settings = {};
    }

    /**
     * Upload new settings to memory
     * 
     * @param {Object} newSettings 
     */
    LoadSettings(newSettings) {
        if (typeof newSettings !== 'object' || Array.isArray(newSettings)) {
            Log.MakeNewNote('Settings.LoadSettings(newSettings)', 'FATAL: couldn\'t load new settings object couse of incorrect data type');

            return;
        }

        this.settings = newSettings;
    }

    /**
     * Parse content from settings.json
     * 
     * @returns {Object}
     */
    ParseSettings() {
        return JSON.parse(fs.readFileSync(SETTINGS_FILE.path).toString());
    }

    /**
     * Get one settings parameter
     * 
     * @param {string} fieldName 
     * @returns {any|null}
     */
    GetField(fieldName) {
        if (!fieldName || typeof fieldName !== 'string') {
            Log.MakeNewNote('Settings.GetField(fieldName)', 'ERROR: fieldName has incorrect type or value.');

            return;
        }

        if (!this.settings[fieldName]) {
            if (this.settings.dev_mode) {
                Log.MakeNewNote('Settings.GetField(fieldName)', `WARNING: field with name ${fieldName} not found. SKIPPED.`);
            }

            return;
        }

        return this.settings[fieldName];
    }

    /**
     * Change one settings parameter
     * 
     * @param {string} fieldName 
     * @param {any} fieldValue 
     * @returns {null}
     */
    ChangeField(fieldName, fieldValue) {
        if (!fieldName || typeof fieldName !== 'string') {
            Log.MakeNewNote('Settings.ChangeField(fieldName, fieldValue)', 'ERROR: fieldName has incorrect type or value.');

            return;
        }

        if (!this.settings[fieldName]) {
            if (this.settings.dev_mode) {
                Log.MakeNewNote('Settings.ChangeField(fieldName, fieldValue)', `WARNING: field with name ${fieldName} not found. SKIPPED.`);
            }

            return;
        }

        this.settings[fieldName] = fieldValue;

        if (this.settings.dev_mode) {
            Log.MakeNewNote('Settings.ChangeField(fieldName, fieldValue)', `SUCCESS: applied ${fieldValue} to ${fieldName}`);
        }
    }

    /**
     * Upload settings data from memory to file
     */
    UploadSettings() {
        if (Object.keys(this.settings).length > 0) {
            fs.writeFileSync(SETTINGS_FILE.path, JSON.stringify(this.settings, null, '\t'));

            if (this.settings.dev_mode) {
                Log.MakeNewNote('Settings.UploadSettings()', 'SUCCESS: uploaded data to settings.json file');
            }
        }
    }
}

exports.Settings = Settings;