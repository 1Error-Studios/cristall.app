let loader = new Loader();
let workspaces = new Workspaces();
let settings = new SettingsLoader();
let localisation = new Localisation();
let editor = new Editor();

let languageDropDown = new DropDown(
    '[drop-down-id="language"]',
    '[drop-down-id="language"] > [drop-down-view="true"]',
    '[drop-down-id="language"] > [drop-down-view="true"] > [drop-down-view-text="true"]',
    '[drop-down-id="language"] > [drop-down-list="true"]'
);

localisation.SetupDefaultLanguage('en-US');

settings.LoadSettings().then(() => {
    settings.SetupTabs();

    localisation.SetupActiveLanguage(settings.GetProperty('language'));
});

localisation.LoadPrebuiltPackages().then(() => {
    randomPhrases = localisation.DropKey(localisation.DropActiveLanguage(), 'random_startup_phrases');
    phrase = randomPhrases[getRandomNumber(0, randomPhrases.length)];

    document.querySelector('#phrases').textContent = phrase;

    localisation.LoadLocalisation();

    languageDropDown.LoadEntries(localisation.DropLanguagesList());
    languageDropDown.ChangeActiveEntry(localisation.GetPackageName(localisation.DropActiveLanguage()));
    languageDropDown.SetupEvents();

    languageDropDown.SetupEventsForEntries((item) => {
        languageDropDown.ChangeActiveEntry(item.getAttribute('entry-name'));
        localisation.SetupActiveLanguage(item.getAttribute('entry-value'));

        languageDropDown.CloseDropDown();

        settings.ChangeProperty('language', item.getAttribute('entry-value'));
        settings.DropSettingsToSystem();

        localisation.LoadLocalisation();
    })
});

workspaces.LoadWorkspace().then(() => {
    if (typeof workspaces.DropActiveWorkspace() === 'number') {
        document.querySelector('.breadcrumbs').style = '';
        document.querySelector('#workspace-name').textContent = workspaces.GetWorkspace(workspaces.DropActiveWorkspace()).name;
    }

    TakeNote('{WEB}.Workspaces.LoadWorkspace()', `SUCCESS: Loaded ${workspaces.DropWorkspacesContent().length} workspaces`);
});

loader.SetRootElement(document.querySelector('.sidebar-list-files'));

loader.LoadWebFiles().then(() => {
    loader.ImplementFiles();
});

// let pluginLoader = new PluginLoader();
// let scriptLoader = new ScriptLoader();

// pluginLoader.SetScriptLoaderLink(scriptLoader);

// pluginLoader.LoadPlugins().then(() => {
//     pluginLoader.ParseAndApplyPlugins();

//     TakeNote("{WEB}.PluginLoader.LoadPlugins(callback).callback()", `SUCCESS: applied ${pluginLoader.plugins.length} plugins.`);
// });

document.querySelectorAll('[data-channel]').forEach(element => {
    element.addEventListener('click', event => {
        let channel = element.getAttribute('data-channel');

        window.electronAPI.invoke(channel);
    });
});

document.querySelector('#file').addEventListener('click', () => {
    if (settings.GetProperty('use_workspaces')) {
        if (workspaces.DropActiveWorkspace() === null) {
            Alert('Error', 'Firstly - create the workspace in settings', 1500)
        }
        else {
            
        }
    }
    else {
        let fileHandler = document.createElement('div');
        fileHandler.classList.add('sidebar-file');

        let fileName = document.createElement('input');
        fileName.classList.add('sidebar-file-input');

        fileHandler.append(fileName);
        document.querySelector('.sidebar-list-files').append(fileHandler);

        if (document.querySelector('.sidebar-not-found')) {
            document.querySelector('.sidebar-not-found').style = 'display: none;';
        }

        fileName.focus();

        fileName.addEventListener('focusout', (event) => {
            if (fileName.value.length === 0) {
                Alert('HEY!', 'What are ya doing? Give name to file!', 1500);
                fileName.remove();

                if (document.querySelector('.sidebar-not-found')) {
                    document.querySelector('.sidebar-not-found').style = '';
                }
            }
            else {
                let extension = fileName.value.split('.')[fileName.value.split('.').length - 1];
                let filename = fileName.value.split('.');
                filename.splice(fileName.value.split('.').length - 1, 1);
                filename = filename.join('.');

                if (!['md', 'umd', 'json'].includes(extension)) {
                    Alert('HEY!', 'Add to file correct extension. Supported: .md, .umd, .json', 3500);
                    fileName.remove();

                    if (document.querySelector('.sidebar-not-found')) {
                        document.querySelector('.sidebar-not-found').style = '';
                    }
                }
                else {
                    window.electronAPI.invoke('files:create-new', JSON.stringify({
                        id: 0,
                        name: filename,
                        filename: fileName.value
                    })).then(() => {
                        fileHandler.remove();

                        document.querySelector('.sidebar-list-files').innerHTML = '';

                        loader.LoadWebFiles().then(() => {
                            loader.ImplementFiles();
                        });
                    });
                }
            }
        });
    }
});

document.querySelector('[data-control="settings"]').addEventListener('click', () => {
    let isSettingsOpened = document.querySelector('.settings-main-body').style.length > 0;


    if (isSettingsOpened) {
        document.querySelector('.settings-main-body').style = '';
        document.querySelector('[data-control="settings"]').classList.add('control-island-button-active');

        $('.settings-sidebar').animate({
            'left': '0'
        }, 320);
    }
    else {
        document.querySelector('.settings-main-body').style = 'display: none';
        document.querySelector('[data-control="settings"]').classList.remove('control-island-button-active');

        document.querySelector('.settings-sidebar').style = '';

        settings.CleanTab();
    }
});

window.electronAPI.invoke('settings:get-version').then(version => {
    document.querySelector('#version').textContent = version;
});

document.querySelector('[control-id="new-quote"]').addEventListener('click', (event) => {
    phrase = randomPhrases[getRandomNumber(0, randomPhrases.length)];

    document.querySelector('#phrases').textContent = phrase;
});

document.querySelector('[control-id="open-console"]').addEventListener('click', (event) => {
    window.electronAPI.invoke('console:open');
});

Broker.DEV_hide_loading_screen();