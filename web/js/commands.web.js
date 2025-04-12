function getRandomNumber (min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

commandExecutor.AddCommand('/echo', (command, options) => {
    let string = options.join(' ');

    AddNote(`ECHO: ${string}`);
});

commandExecutor.AddCommand('/math', (command, options) => {
    let problem = options.join(' ');

    AddNote(`RESULT: ${eval(problem)}`);
});

commandExecutor.AddCommand('/invisible', (command, options) => {
    let status = options[0];

    window.electronAPI.invoke('console:command:invisible', status);
    AddNote(`LOGGED: invisible-mode turned to ${status}`);
});

commandExecutor.AddCommand('/georgia', (command, options) => { // Still, I think it's worth deleting. It's cursed. - Ural-Letov
    let wordsCount = getRandomNumber(5, 25);
    let words = ['сам', 'нет ты', 'терпи', 'не мороси', 'карлик', 'петух', 'баля', 'саси', 'не шаришь'];

    let result = '';

    for (let i = 0; i < wordsCount; i++) {
        result += words[getRandomNumber(0, words.length)] + ' ';
    }

    AddNote(`KOSTYA-AI GENERATED: ${result}`);
});