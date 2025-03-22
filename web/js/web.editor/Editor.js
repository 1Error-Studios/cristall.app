class Editor {
    constructor() {
        this.title = null;

        this.elements = [];
        this.content = [];
    }

    Initialize(fileContent) {
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
        console.log(marked.parse(content));
    }

    LoadJSON(content) {

    }
}