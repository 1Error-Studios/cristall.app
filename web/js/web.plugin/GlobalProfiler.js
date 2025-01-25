class GlobalProfiler {
    static executors = [];

    constructor() {}

    static Push(executor) {
        GlobalProfiler.executors.push({
            createdAt: Date.now(),
            executor
        });
    }

    static GetExecutable(context) {
        return GlobalProfiler.executors.find(item => item.executor.GetContext() === context).executor;
    }
}