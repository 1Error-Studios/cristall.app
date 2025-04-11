class Editor {
    constructor() {
        this.title = null;

        this.elements = [];
        this.content = [];
    }

    Initialize(fileContent) {
        this.title = fileContent.name;

        window.electronAPI.invoke('files:load-file', {
            id: loader.GetActiveWorkspace(),
            filename: fileContent.filename
        }).then(data => {
            if (fileContent.filename.includes('.md')) {
                this.LoadMD(data);
            }
            else if (fileContent.filename.includes('.json')) {
                this.LoadJSON(data);
            }
            else {
                TakeNote('{WEB}.Editor.Initialize(fileContent)', `WARNING: couldn't find parser for @file [${fileContent.filename}]`);
            }
        });
    }

    LoadMD(content) {
        this.content = CleanUpMD(content);

        this.ParseAndExecute();
    }

    ParseAndExecute() {
        document.querySelector('[interface-role-id="viewport"]').innerHTML = '';

        let result = HandleMDCode(this.content);

        this.elements = result;

        this.ImplementElements();
    }

    UpdateCode() {
        let updatedVersion = [];

        document.querySelectorAll('.md-block').forEach(item => {
            if (!item.getAttribute('original-content').includes('\n')) {
                updatedVersion.push(item.getAttribute('original-content'));
            }
            else {
                updatedVersion = updatedVersion.concat(...(item.getAttribute('original-content').split('\n')));
            }

            updatedVersion.push("");
        });

        this.content = updatedVersion;

        console.log(this.content);

        this.ParseAndExecute();
    }

    LoadJSON(content) {
        
    }

    ImplementElements() {
        TakeNote('{WEB}.Editor.ImplementElements()', `INFO: created ${this.elements.length} elements`);

        document.querySelector('[interface-role-id="viewport"]').innerHTML += `<h1 class="viewport-title">${this.title.length > 0 ? this.title : 'Unnamed'}</h1>`

        this.elements.forEach(element => {
            document.querySelector('[interface-role-id="viewport"]').append(element);
        });

        for (let i = 0; i < this.elements.length; i++) {
            let item = this.elements[i];

            item.addEventListener('focus', (event) => {
                item.textContent = item.getAttribute('original-content');
                item.setAttribute('class', 'md-block');
            });

            item.addEventListener('blur', (event) => {
                item.setAttribute('original-content', item.innerText);
                this.UpdateCode();
            });

            item.addEventListener('input', (event) => {
                console.log('pidor')
            })
        }

        this.elements.forEach(element => {
            document.querySelector('[interface-role-id="viewport"]').append(element);
        });
    }
}