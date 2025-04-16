class Editor {
    constructor() {
        this.title = null;
        this.workspace = null;
        this.filename = null;

        this.lastElement = null;

        this.elements = [];
        this.content = [];
    }

    Initialize(fileContent) {
        this.title = fileContent.name;
        this.workspace = loader.GetActiveWorkspace();
        this.filename = fileContent.filename;

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

        HighlightAllCode();

        if (this.lastElement) {
            this.lastElement.focus();
            this.lastElement = null;
        }

        this.SetupEvents();
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

        this.ParseAndExecute();

        this.SaveFile();
    }

    LoadJSON(content) {
        
    }

    ImplementElements() {
        TakeNote('{WEB}.Editor.ImplementElements()', `INFO: created ${this.elements.length} elements`);

        document.querySelector('[interface-role-id="viewport"]').innerHTML += `<h1 class="viewport-title">${this.title.length > 0 ? this.title : 'Unnamed'}</h1>`

        this.elements.forEach(element => {
            document.querySelector('[interface-role-id="viewport"]').append(element);
        });

        this.elements.forEach(element => {
            document.querySelector('[interface-role-id="viewport"]').append(element);
        });

        let block = document.createElement('div');
        block.classList.add('md-block');
        block.setAttribute('contenteditable', true);
        block.setAttribute('original-content', '');
        block.setAttribute('uuid', UUID());

        this.elements.push(block);
        document.querySelector('[interface-role-id="viewport"]').append(block);
    }

    SaveFile() {
        let self = this;

        window.electronAPI.invoke('files:save', JSON.stringify({
            filename: self.filename,
            id: self.workspace,
            content: self.content.join('\n')
        }));
    }

    SetupEvents() {
        let self = this;

        for (let i = 0; i < this.elements.length; i++) {
            let item = this.elements[i];

            item.addEventListener('focus', (event) => {
                self.lastElement = item;

                item.textContent = item.getAttribute('original-content');
                item.setAttribute('class', 'md-block');
            });

            item.addEventListener('blur', (event) => {
                item.setAttribute('original-content', item.innerText);
                this.UpdateCode();
            });

            item.addEventListener('input', (event) => {
                if (i === this.elements.length - 1) {
                    if (item.innerText.length > 0) {
                        let block = document.createElement('div');
                        block.classList.add('md-block');
                        block.setAttribute('contenteditable', true);
                        block.setAttribute('original-content', '');
                        block.setAttribute('uuid', UUID());

                        this.elements.push(block);
                        document.querySelector('[interface-role-id="viewport"]').append(block);
                    }
                    else {
                        let removeable = this.elements.pop();
                        document.querySelector(`[uuid="${removeable.getAttribute('uuid')}"]`).remove();
                    }
                }
            });

            item.addEventListener('keypress', (event) => {
                if (event.keyCode == 13)  {
                    event.preventDefault();
    
                    if (event.shiftKey) {
                        let block = document.createElement('div');
                        block.classList.add('md-block');
                        block.setAttribute('contenteditable', true);
                        block.setAttribute('original-content', ' ');
                        block.setAttribute('uuid', UUID());
    
                        self.elements.splice(self.elements.indexOf(item), 0, block);
    
                        item.after(block);
    
                        self.lastElement = block;
                    }
                    else {
                        document.execCommand('insertHTML', false,  '\n');
                    }
                }
            })

            $(item).on('keypress', (event) => {
                
            });
        }
    }
}