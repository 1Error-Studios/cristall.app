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
            return {
                command: foundedCommand,
                arguments: splitted
            };
        }
        else {
            cristallConsole.SendMessage('console', `WARNING: Unknown command - ${command}`);
        }
    }

    /**
     * Add command to list
     * 
     * @param {string} command 
     * @param {string} description 
     * @param {function} handler 
     */
    AddCommand(command, description, handler) {
        this.commands.push({
            command,
            description,
            handler
        });
    }

    /**
     * Get list of commands
     * 
     * @returns {Array}
     */
    Help() {
        return this.commands.map(item => {
            return {
                command: item.command,
                description: item.description
            }
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