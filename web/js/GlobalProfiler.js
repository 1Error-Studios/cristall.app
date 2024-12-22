class GlobalProfiler {
    constructor() {
        this.executors = [];
    }

    Push(executor) {
        this.executors.push(executor);
    }
}