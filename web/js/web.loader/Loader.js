class Loader {
    constructor() {
        this.files = [];
    }

    LoadWebFiles() {
        window.electronAPI.invoke('files:load-all').then(result => {
            this.files = result;
            console.log(result);
        });
    }
}