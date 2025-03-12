class SettingsLoader {
    constructor() {
        this.settings = {};
        this.currentTab = 0;
    }

    /**
     * Load settings into web-client
     */
    LoadSettings() {
        if (!this.settings || typeof settings != 'object' || Array.isArray(settings)) {
            TakeNote('{Web}.SettingsLoader.LoadSettings(settings)', 'FATAL: incorrect settings object. SKIPPED');

            return;
        }

        return new Promise((resolve, reject) => {
            window.electronAPI.invoke('settings:load-all').then(data => {
                this.settings = data;

                if (!this.settings.dev_mode) {
                    document.querySelector('[sector-control-id="development"]').classList.add('settings-button-disabled');
                }

                TakeNote('{Web}.SettingsLoader.LoadSettings(settings)', 'SUCCESS: Loaded new instance to @settings');

                return resolve();
            });
        });
    }

    /**
     * Change settings tab
     * 
     * @param {string} sector 
     */
    ChangeTab(sector) {
        if (!sector || typeof sector != 'string') {
            TakeNote('{Web}.SettingsLoader.ChangeTab(sector)', `FAILED: @sector not found or incorrect. SKIPPED.`);

            return;
        }

        if (!['appearence', 'system', 'workspaces', 'plugins', 'development', 'about'].includes(sector)) {
            TakeNote('{Web}.SettingsLoader.ChangeTab(sector)', 'FAILED: trying to show non-exist @sector. SKIPPED.');

            return;
        }

        if (this.currentTab != 0) {
            document.querySelector(`[sector-id="${this.currentTab}"]`).style = 'display: none';
        }

        this.currentTab = sector;

        document.querySelector(`[sector-id="${this.currentTab}"]`).style = '';

        TakeNote('{Web}.SettingsLoader.ChangeTab(sector)', `SUCCESS: changed settings tab to ${sector}`);
    }

    /**
     * Setup events to control buttons
     */
    SetupTabs() {
        document.querySelectorAll('[sector-control-id]').forEach(element => {
            element.addEventListener('click', (event) => {
                let sector = element.getAttribute('sector-control-id');

                if (sector == 'development' && !this.settings.dev_mode) {
                    Alert('Error', 'To open development settings check the system tab.', 1500);

                    return;
                }

                this.ChangeTab(sector);
            });
        });

        TakeNote('{Web}.SettingsLoader.SetupTabs()', 'SUCCESS: events loaded');
    }
}