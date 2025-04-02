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
        let parsedMarkdown = content.split('\n');
        parsedMarkdown = this.CleanUpContent(parsedMarkdown);

        TakeNote('{WEB}.Editor.LoadMD(content)', `INFO: parsed markdown: ${JSON.stringify(parsedMarkdown)}`);

        parsedMarkdown.forEach(item => {
            let element = marked.parse(item);

            console.log(element);

            this.elements.push(element);
        });

        this.ImplementElements();
    }

    LoadJSON(content) {
        
    }

    ImplementElements() {
        TakeNote('{WEB}.Editor.ImplementElements()', `INFO: created ${this.elements.length} elements`);

        document.querySelector('[interface-role-id="viewport"]').innerHTML += `<h1 class="viewport-title">${this.title.length > 0 ? this.title : 'Unnamed'}</h1>`

        this.elements.forEach(element => {
            document.querySelector('[interface-role-id="viewport"]').innerHTML += element;
        });

        document.querySelector('[interface-role-id="viewport"]').childNodes.forEach((item, index) => {
            if (item.tagName) {
                if (item.tagName === 'P') {
                    item.classList.add('viewport-text');
                }
            }
        })
    }

    CleanUpContent(content) {
        let result = [];

        for (let i = 0; i < content.length; i++) {
            if (!['\r', '\n'].includes(content[i])) {
                result.push(content[i]);
            }
        }

        return result;
    }
}