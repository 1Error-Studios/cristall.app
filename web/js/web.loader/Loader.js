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
                <p class="sidebar-file-name" id="file-name">${item.split('.')[0]}</p>
                `

                this.root.append(file);
            });
        }
        else {
            function getRandomNumber (min, max) {
                return Math.floor(Math.random() * (max - min)) + min
            }
            let randomPhrases = ['Womp-womp, no files?', 'Error 404. Files not found.', 'Shut up and take my files!', 'Where\'s the files Lebowski?', 'Pas de bras, pas de files.', 'The files are missing due to cascading resonance. I\'m so sorry.', 'Fun fact: there are no files.', 'Still no files.', 'What are you seeking for here?', 'You\'re an anomaly, a tumour of the worlds.', 'A guy opens his file and gets redacted and you think that of me? No. I am the one who redacted!', 'The right word in the wrong place can make all the difference in the file.', 'When plugin gives you error? Don\'t make bug reports. Make plugins take the error back! Get mad!', 'I used to be a plugin developer like you, until I got a critical error in the debug log.', 'Files. Files never been found.', 'You know, I\'m something of a file editor.'];
            let notFound = document.createElement('div');
            notFound.classList.add('sidebar-not-found');

            notFound.innerHTML =
            `
            <p class="sidebar-not-found-text">${randomPhrases[getRandomNumber(0, randomPhrases.length)]}</p>
            `;

            this.root.append(notFound);
        }
    }
}