class SignalWorker {
    constructor() {
        this.signals = {}
    }

    /**
     * Create new global signal
     * 
     * @param {string} signalName 
     */
    Append(signalName) {
        if (!signalName) {
            Log.MakeNewNote('SignalWorker.Append(signalName)', 'ERROR: @signalName not found. SKIPPED');

            return;
        }

        if (typeof signalName !== 'string') {
            Log.MakeNewNote('SignalWorker.Append(signalName)', 'ERROR: @signalName isn\'t string. SKIPPED');

            return;
        }

        if (this.signals[signalName]) {
            Log.MakeNewNote('SignalWorker.Append(signalName)', `WARNING: signal with @signalName [${signalName}] already exist. SKIPPED`);

            return;
        }

        this.signals[signalName] = false;

        Log.MakeNewNote('SignalWorker.Append(signalName)', `SUCCESS: applied new signal: ${signalName}`);
    }

    /**
     * Enable signal
     * 
     * @param {string} signalName 
     */
    On(signalName) {
        if (!signalName) {
            Log.MakeNewNote('SignalWorker.On(signalName)', 'ERROR: @signalName not found. SKIPPED');

            return;
        }

        if (typeof signalName !== 'string') {
            Log.MakeNewNote('SignalWorker.On(signalName)', 'ERROR: @signalName isn\'t string. SKIPPED');

            return;
        }

        if (!this.signals[signalName]) {
            Log.MakeNewNote('SignalWorker.On(signalName)', `ERROR: signal with @signalName [${signalName}] doesn't exist. SKIPPED`);

            return;
        }

        this.signals[signalName] = true;

        Log.MakeNewNote('SignalWorker.On(signalName)', `SUCCESS: signal [${signalName}] was enabled`);
    }

    /**
     * Disable signal
     * 
     * @param {string} signalName 
     */
    Off(signalName) {
        if (!signalName) {
            Log.MakeNewNote('SignalWorker.Off(signalName)', 'ERROR: @signalName not found. SKIPPED');

            return;
        }

        if (typeof signalName !== 'string') {
            Log.MakeNewNote('SignalWorker.Off(signalName)', 'ERROR: @signalName isn\'t string. SKIPPED');

            return;
        }

        if (!this.signals[signalName]) {
            Log.MakeNewNote('SignalWorker.Off(signalName)', `ERROR: signal with @signalName [${signalName}] doesn't exist. SKIPPED`);

            return;
        }

        this.signals[signalName] = false;

        Log.MakeNewNote('SignalWorker.Off(signalName)', `SUCCESS: signal [${signalName}] was disabled`);
    }

    /**
     * Check signal's status
     * 
     * @param {string} signalName 
     * @returns {boolean}
     */
    Check(signalName) {
        if (!signalName) {
            Log.MakeNewNote('SignalWorker.Check(signalName)', 'ERROR: @signalName not found. SKIPPED');

            return;
        }

        if (typeof signalName !== 'string') {
            Log.MakeNewNote('SignalWorker.Check(signalName)', 'ERROR: @signalName isn\'t string. SKIPPED');

            return;
        }

        if (!this.signals[signalName]) {
            Log.MakeNewNote('SignalWorker.Check(signalName)', `ERROR: signal with @signalName [${signalName}] doesn't exist. SKIPPED`);

            return;
        }

        return this.signals[signalName];
    }
}

exports.SignalWorker = SignalWorker;