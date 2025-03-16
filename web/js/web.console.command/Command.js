class CommandExecutor {
    constructor() {
        this.commands = [];
    }

    /**
     * 
     * @param {string} command 
     */
    Execute(command) {
        let splitted = command.split(' ');
        let commandInNature = splitted[0];
        splitted.splice(0, 1);

        let foundedCommand = this.commands.find(item => item.command === commandInNature);

        if (foundedCommand) {
            foundedCommand.handler(commandInNature, splitted);
        }
    }

    AddCommand(command, handler) {
        this.commands.push({
            command,
            handler
        });
    }
}