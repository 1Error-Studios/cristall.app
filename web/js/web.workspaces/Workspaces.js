class Workspaces {
    constructor() {
        this.workspace = null;
    }

    LoadWorkspace() {
        return new Promise((resolve, reject) => {
            window.electronAPI.invoke('workspaces:load-all').then(data => {
                this.workspace = data;

                return resolve();
            });
        });
    }

    DropActiveWorkspace() {
        return this.workspace.active;
    }

    DropWorkspacesContent() {
        return this.workspace.content;
    }

    GetWorkspace(index) {
        return this.workspace.content.find(item => item.index === index);
    }
}