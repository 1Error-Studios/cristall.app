class Executor {
    constructor() {
        this.API = {};
        this.scripts = {};
        this.context = null;
    }

    LoadAPI() {
        this.API = APIProfiler;
    }

    LoadScripts(scripts) {
        this.scripts = scripts;
    }

    LoadContext(context) {
        this.context = context;
    }

    Execute() {
        
    }
}