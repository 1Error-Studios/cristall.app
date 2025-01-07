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
            let notFound = document.createElement('div');
            notFound.classList.add('sidebar-not-found');

            notFound.innerHTML =
            `
            <p class="sidebar-not-found-text">Hohol ne obnaruzhen</p>
            `;

            this.root.append(notFound);
        }
    }
}