class Executor {
    constructor() {
        this.API = {};
        this.scripts = {};
        this.context = null;
    }

    LoadAPI(APIProfiler) {
        this.API = APIProfiler;
    }

    LoadScripts(scripts) {
        this.scripts = scripts;
    }

    LoadContext(context) {
        this.context = context;
        this.API.context = context;
    }

    GetContext() {
        return this.context;
    }

    CallAPI(APIModule, APIFunction, args = []) {
        let func = this.API[APIModule][APIFunction].bind(this.API);

        return func(...args);
    }

    Execute(readyElement, func) {
        switch(func.type) {
            case "event":
                readyElement.addEventListener(func.event_name, (event) => {
                    let executable = this.scripts[`${func.call.function_name}`];

                    let args = [];

                    func.call.include.forEach(include => {
                        if (include === 'event') {
                            args.push(event);
                        }
                        else if (include === 'context') {
                            args.push(this.context);
                        }
                        else if (include === 'call_api') {
                            args.push(this.CallAPI.bind(this));
                        }
                    });

                    executable(...args);
                });

                break;
        }
    }
}