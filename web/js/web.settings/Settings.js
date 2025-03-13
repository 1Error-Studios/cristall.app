class SettingsLoader {
    constructor() {
        this.settings = {};
        this.currentTab = 'appearence';
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
     * @param {number} index 
     */
    ChangeTab(sector, index) {
        if (!sector || typeof sector != 'string') {
            TakeNote('{Web}.SettingsLoader.ChangeTab(sector)', `FAILED: @sector not found or incorrect. SKIPPED.`);

            return;
        }

        if (!['appearence', 'system', 'workspaces', 'plugins', 'development', 'about'].includes(sector)) {
            TakeNote('{Web}.SettingsLoader.ChangeTab(sector)', 'FAILED: trying to show non-exist @sector. SKIPPED.');

            return;
        }

        let id = document.querySelector(`[sector-id="${this.currentTab}"]`).getAttribute('control-index');

        document.querySelector(`[sector-id="${this.currentTab}"]`).parentElement.style = 'position: relative;'

        if (index > id) {
            $(document.querySelector(`[sector-id="${this.currentTab}"]`).parentElement).animate({
                top: '-100%'
            }, 220, () => {
                document.querySelector(`[sector-control-id="${this.currentTab}"]`).classList.remove('settings-button-active');
                document.querySelector(`[sector-id="${this.currentTab}"]`).style = 'display: none';

                this.currentTab = sector;

                Next(this.currentTab);
            });
        }
        else {
            $(document.querySelector(`[sector-id="${this.currentTab}"]`).parentElement).animate({
                top: '100%'
            }, 220, () => {
                document.querySelector(`[sector-control-id="${this.currentTab}"]`).classList.remove('settings-button-active');
                document.querySelector(`[sector-id="${this.currentTab}"]`).style = 'display: none';

                this.currentTab = sector;

                Next(this.currentTab);
            });
        }

        function Next(currentTab) {
            if (index > id) {
                document.querySelector(`[sector-id="${currentTab}"]`).parentElement.style = 'position: relative; top: 100%;';
            }
            else {
                document.querySelector(`[sector-id="${currentTab}"]`).parentElement.style = 'position: relative; top: -100%;';
            }

            document.querySelector(`[sector-control-id="${currentTab}"]`).classList.add('settings-button-active');

            document.querySelector(`[sector-id="${currentTab}"]`).style = 'position: relative; top: 100%;';

            $(document.querySelector(`[sector-id="${currentTab}"]`).parentElement).animate({
                top: '0'
            }, 220, () => {
                document.querySelector(`[sector-id="${currentTab}"]`).style = '';
            });
        }

        TakeNote('{Web}.SettingsLoader.ChangeTab(sector)', `SUCCESS: changed settings tab to ${sector}`);
    }

    /**
     * Setup events to control buttons
     */
    SetupTabs() {
        document.querySelectorAll('[sector-control-id]').forEach(element => {
            element.addEventListener('click', (event) => {
                let sector = element.getAttribute('sector-control-id');
                let id = document.querySelector(`[sector-id="${sector}"]`).getAttribute('control-index');

                if (sector == 'development' && !this.settings.dev_mode) {
                    Alert('Error', 'To open development settings check the system tab.', 1500);

                    return;
                }
                else if (sector == 'plugins') {
                    Alert('Error', 'The plugins are still in development. Please be patient.', 1500);

                    return;
                }

                this.ChangeTab(sector, id);
            });
        });

        TakeNote('{Web}.SettingsLoader.SetupTabs()', 'SUCCESS: events loaded');
    }

    CleanTab() {
        this.ChangeTab('appearence');
    }

    GetProperty(key) {
        return this.settings[key];
    }

    ChangeProperty(key, newValue) {
        this.settings[key] = newValue;
    }

    DropSettingsToSystem() {
        window.electronAPI.invoke('settings:save', JSON.stringify(this.settings));
    }
}