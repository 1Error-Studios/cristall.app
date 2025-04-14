function getRandomNumber (min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

commandExecutor.AddCommand('/echo', 'simple echo command.', (options) => {
    let string = options.join(' ');

    cristallConsole.SendMessage('console', `${string}`);
});

commandExecutor.AddCommand('/math', 'do some magic (math, sorry)', (options) => {
    let problem = options.join(' ');

    cristallConsole.SendMessage('console', `RESULT: ${eval(problem)}`);
});

commandExecutor.AddCommand('/invisible', 'DO NOT EXECUTE!', (options) => {
    let status = options[0];

    window.electronAPI.invoke('console:command:invisible', status);
    cristallConsole.SendMessage('console', `LOGGED: invisible-mode turned to ${status}`);
});

commandExecutor.AddCommand('/georgia', 'wth? I don\'t remember this command...', (options) => { // Still, I think it's worth deleting. It's cursed. - Ural-Letov
    let wordsCount = getRandomNumber(5, 25);
    let words = ['сам', 'нет ты', 'терпи', 'не мороси', 'карлик', 'петух', 'баля', 'саси', 'не шаришь'];

    let result = '';

    for (let i = 0; i < wordsCount; i++) {
        result += words[getRandomNumber(0, words.length)] + ' ';
    }

    cristallConsole.SendMessage('console', `KOSTYA-AI GENERATED: ${result}`);
});

commandExecutor.AddCommand('/help', 'get list of all command', (options) => {
    let commands = commandExecutor.Help();

    cristallConsole.SendMessage('console', `HELP:\n${commands.map(item => `${item.command} - ${item.description}`).join('\n')}`);
});