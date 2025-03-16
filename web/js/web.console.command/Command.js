class CommandExecutor {
    constructor() {
        this.commands = [];

        this.executed = [];
        this.lastIndex = 0;
    }

    /**
     * 
     * @param {string} command 
     */
    Execute(command) {
        this.executed.push(command);
        let splitted = command.split(' ');
        let commandInNature = splitted[0];
        splitted.splice(0, 1);

        let foundedCommand = this.commands.find(item => item.command === commandInNature);

        if (foundedCommand) {
            foundedCommand.handler(commandInNature, splitted);
        }
        else {
            AddNote('WARNING: Unknown command.');
        }

        this.DropLastExecuted();
    }

    AddCommand(command, handler) {
        this.commands.push({
            command,
            handler
        });
    }

    DropLastExecuted() {
        this.lastIndex = this.executed.length;
    }

    UpLastIndex() {
        if (this.executed[this.lastIndex + 1]) {
            this.lastIndex += 1;
        }
    }

    DownLastIndex() {
        if (this.executed[this.lastIndex - 1]) {
            this.lastIndex -= 1;
        }
    }

    GetLastExecuted() {
        return this.executed[this.lastIndex];
    }
}