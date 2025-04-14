class CristallConsole {
    constructor() {
        this.messages = [];

        this.inputElement = null;
        this.sendButtonElement = null;
        this.messagesViewport = null;
    }

    Initialize(input, sendButton, viewport) {
        this.inputElement = input;
        this.sendButtonElement = sendButton;
        this.messagesViewport = viewport;
    }

    SendMessage(from = 'user', text) {
        let message = null;

        if (!text) {
            message = this.inputElement.value;
        }
        else {
            message = text;
        }

        if (message.length === 0) return;

        let executionResult = null;

        if (from !== 'console') {
            executionResult = commandExecutor.Execute(message);
        }

        if (from === 'user') {
            this.messagesViewport.innerHTML += `<div class="message from-user"><div class="message-title">Your input.</div><div class="message-text">${message}</div></div>`
        }
        else {
            this.messagesViewport.innerHTML += `<div class="message from-console"><div class="message-title">Console response</div><div class="message-text">${text}</div></div>`
        }

        if (executionResult) {
            setTimeout(() => {
                executionResult['command'].handler(executionResult['arguments']);
            }, 500);
        }

        this.inputElement.value = '';
    }

    SetupEvents() {
        document.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                this.SendMessage();
            }
            else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                if (event.key === 'ArrowUp') {
                    commandExecutor.DownLastIndex();
                }
                else {
                    commandExecutor.UpLastIndex();
                }

                let command = commandExecutor.GetLastExecuted();
                
                if (command) {
                    this.InsertText(command);
                }
            }
        });

        this.sendButtonElement.addEventListener('click', () => {
            this.SendMessage();
        });
    }

    InsertText(text) {
        this.inputElement.value = text;
    }
}