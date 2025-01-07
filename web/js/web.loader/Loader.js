class Loader {
    constructor() {
        this.filesNames = [];
        this.filesParsed = [];

        this.root = null;
    }

    SetRootElement(root) {
        this.root = root;
    }

    LoadWebFiles() {
        return new Promise((resolve, reject) => {
            window.electronAPI.invoke('files:load-all').then(result => {
                this.files = result;

                return resolve();
            });
        });
    }

    ParseAllFiles() {
        if (this.files.length > 0) {
            this.files.forEach(item => {
                window.electronAPI.invoke('files:load-file', item).then(data => {
                    this.filesParsed.push(data);
                });
            });
        }
    }

    ImplementFiles() {
        if (this.files.length > 0) {
            this.files.forEach(item => {
                let file = document.createElement('button');
                file.classList.add('sidebar-file');
                
                file.innerHTML =
                `
                <div class="sidebar-file-type"><p class="sidebar-file-type-name">${item.split('.')[item.split('.').length - 1].toUpperCase()}</p></div>
                <div class="sidebar-file-marker"></div>
                <p class="sidebar-file-name" id="file-name">${item}</p>
                `

                this.root.append(file);
            });
        }
        else {
            function getRandomNumber (min, max) {
                return Math.floor(Math.random() * (max - min)) + min
            }
            let randomPhrases = ['Womp-womp, no files?', 'Error 404. Files not found.', 'Shut up and take my files!', 'Where\'s the files Lebowski?', 'Pas de bras, pas de files.', 'The files are missing due to cascading resonance. I\'m so sorry.', 'Fun fact: there are no files.'];
            let notFound = document.createElement('div');
            notFound.classList.add('sidebar-not-found');

            notFound.innerHTML =
            `
            <p class="sidebar-not-found-text">${randomPhrases[getRandomNumber(0, randomPhrases.length - 1)]}</p>
            `;

            this.root.append(notFound);
        }
    }
}