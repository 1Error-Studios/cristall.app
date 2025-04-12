let commandExecutor = new CommandExecutor();

function TimeConverter(UNIX_timestamp){
    let input = new Date(UNIX_timestamp);

    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = input.getFullYear();
    let month = months[input.getMonth()];

    let date = input.getDate();
    let hour = input.getHours() < 10 ? `0${input.getHours()}` : input.getHours();
    let min = input.getMinutes() < 10 ? `0${input.getMinutes()}` : input.getMinutes();
    let sec = input.getSeconds() < 10 ? `0${input.getSeconds()}` : input.getSeconds();

    let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;

    return time;
}

function HandleLogMessages(data) {
    data.forEach(item => {
        let message = document.createElement('div');
        message.classList.add('message-frame');
        let messageAdditionalFrame = document.createElement('div');
        messageAdditionalFrame.classList.add('message-item-frame');

        let messageTitle = document.createElement('p');
        messageTitle.classList.add('message-title');
        messageTitle.textContent = item.title;

        let messageTitleFrame = document.createElement('div');
        messageTitleFrame.classList.add('message-title-frame');

        let messageIcon = document.createElement('div');
        messageIcon.classList.add('message-icon');

        if (item.message.includes('FATAL', 'ERROR', 'FAILED')) {
            messageTitle.classList.add('message-title-error');

            messageIcon.innerHTML = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M10.9999 20.1666C16.0599 20.1666 20.1666 16.0599 20.1666 10.9999C20.1666 5.93992 16.0599 1.83325 10.9999 1.83325C5.93992 1.83325 1.83325 5.93992 1.83325 10.9999C1.83325 16.0599 5.93992 20.1666 10.9999 20.1666Z" stroke="#C44A4A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/> <path d="M17.325 4.58325L4.4917 17.4166" stroke="#C44A4A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/> </svg>`;
        }
        else if (item.message.includes('INFO')) {
            messageTitle.classList.add('message-title-info');

            messageIcon.innerHTML = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M11 14.8958V10.0833" stroke="#007AFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M2.67665 14.1351V7.86508C2.67665 6.83842 3.22665 5.88504 4.11582 5.36254L9.56082 2.21838C10.45 1.70505 11.55 1.70505 12.4483 2.21838L17.8933 5.36254C18.7825 5.87588 19.3325 6.82925 19.3325 7.86508V14.1351C19.3325 15.1617 18.7825 16.1151 17.8933 16.6376L12.4483 19.7817C11.5592 20.2951 10.4592 20.2951 9.56082 19.7817L4.11582 16.6376C3.22665 16.1151 2.67665 15.1709 2.67665 14.1351Z" stroke="#007AFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M11 7.1499V7.05824" stroke="#007AFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </svg>`;
        }
        else if (item.message.includes('SUCCESS')) {
            messageTitle.classList.add('message-title-success');

            messageIcon.innerHTML = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M8.24992 20.1666H13.7499C18.3333 20.1666 20.1666 18.3333 20.1666 13.7499V8.24992C20.1666 3.66659 18.3333 1.83325 13.7499 1.83325H8.24992C3.66659 1.83325 1.83325 3.66659 1.83325 8.24992V13.7499C1.83325 18.3333 3.66659 20.1666 8.24992 20.1666Z" stroke="#34C759" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M7.10425 10.9999L9.69841 13.5941L14.8959 8.40576" stroke="#34C759" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>`;
        }
        else if (item.message.includes('WARNING')) {
            messageTitle.classList.add('message-title-warning');

            messageIcon.innerHTML = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M11 8.25V12.8333" stroke="#FFCC00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M10.9999 19.6258H5.4449C2.26406 19.6258 0.934898 17.3525 2.4749 14.575L5.3349 9.42334L8.0299 4.58334C9.66156 1.64084 12.3382 1.64084 13.9699 4.58334L16.6649 9.43251L19.5249 14.5842C21.0649 17.3617 19.7266 19.635 16.5549 19.635H10.9999V19.6258Z" stroke="#FFCC00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M10.9949 15.5833H11.0031" stroke="#FFCC00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </svg>`;
        }
        else {
            messageTitle.classList.add('message-title-info');

            messageIcon.innerHTML = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M11 14.8958V10.0833" stroke="#007AFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M2.67665 14.1351V7.86508C2.67665 6.83842 3.22665 5.88504 4.11582 5.36254L9.56082 2.21838C10.45 1.70505 11.55 1.70505 12.4483 2.21838L17.8933 5.36254C18.7825 5.87588 19.3325 6.82925 19.3325 7.86508V14.1351C19.3325 15.1617 18.7825 16.1151 17.8933 16.6376L12.4483 19.7817C11.5592 20.2951 10.4592 20.2951 9.56082 19.7817L4.11582 16.6376C3.22665 16.1151 2.67665 15.1709 2.67665 14.1351Z" stroke="#007AFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M11 7.1499V7.05824" stroke="#007AFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </svg>`;
        }

        let messageTimeStamp = document.createElement('p');
        messageTimeStamp.classList.add('message-time-stamp');
        messageTimeStamp.textContent = TimeConverter(item.time);

        let messageDescription = document.createElement('p');
        messageDescription.classList.add('message-description');
        messageDescription.textContent = item.message;

        messageTitleFrame.append(messageIcon);
        messageTitleFrame.append(messageTitle);

        messageAdditionalFrame.append(messageTimeStamp);
        messageAdditionalFrame.append(messageDescription);
        message.append(messageTitleFrame);
        message.append(messageAdditionalFrame);

        document.querySelector('.console-messages-frame').append(message);
    });
}

function ClearLog() {
    document.querySelector('.console-messages-frame').innerHTML = '';
}

function AddNote(text) {
    TakeNote('{CONSOLE}.UserInput', text);

    let message = document.createElement('div');
    message.classList.add('message-frame');
    let messageAdditionalFrame = document.createElement('div');
    messageAdditionalFrame.classList.add('message-item-frame');

    let messageTitle = document.createElement('p');
    messageTitle.classList.add('message-title');
    messageTitle.textContent = '{CONSOLE}.UserInput';

    if (text.includes('FATAL', 'ERROR', 'FAILED')) {
        messageTitle.classList.add('message-title-error')
    }
    else if (text.includes('INFO')) {
        messageTitle.classList.add('message-title-info')
    }
    else if (text.includes('SUCCESS')) {
        messageTitle.classList.add('message-title-success')
    }
    else if (text.includes('WARNING')) {
        messageTitle.classList.add('message-title-warning')
    }
    else {
        messageTitle.classList.add('message-title-info')
    }

    let messageTimeStamp = document.createElement('p');
    messageTimeStamp.classList.add('message-time-stamp');
    messageTimeStamp.textContent = TimeConverter(Date.now());

    let messageDescription = document.createElement('p');
    messageDescription.classList.add('message-description');
    messageDescription.textContent = text;

    messageAdditionalFrame.append(messageTimeStamp);
    messageAdditionalFrame.append(messageDescription);
    message.append(messageTitle);
    message.append(messageAdditionalFrame);

    document.querySelector('.console-messages-frame').append(message);
}

document.querySelectorAll('[data-channel]').forEach(element => {
    element.addEventListener('click', event => {
        let channel = element.getAttribute('data-channel');

        window.electronAPI.invoke(channel);
    });
});

window.electronAPI.invoke('console:load-messages').then(data => {
    HandleLogMessages(JSON.parse(data));
});

document.querySelector('[control-id="refresh"]').addEventListener('click', () => {
    window.electronAPI.invoke('console:load-messages').then(data => {
        ClearLog();
        HandleLogMessages(JSON.parse(data));
        document.querySelector('.console-messages-frame').scrollTo(0, document.querySelector('.console-messages-frame').scrollHeight);
    });
});

function ExecuteCommand() {
    let command = document.querySelector('.console-input').value;

    if (command.length > 0) {
        commandExecutor.Execute(command);
        document.querySelector('.console-input').value = '';
        document.querySelector('.console-messages-frame').scrollTo(0, document.querySelector('.console-messages-frame').scrollHeight);
    }
}

document.querySelector('[control-id="execute"]').addEventListener('click', () => {
    ExecuteCommand();
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        ExecuteCommand();
    }
    else if (event.key === 'ArrowUp') {
        commandExecutor.DownLastIndex();
        let command = commandExecutor.GetLastExecuted();
        
        if (command) {
            document.querySelector('.console-input').value = command;
        }
    }
    else if (event.key === 'ArrowDown') {
        commandExecutor.UpLastIndex();
        let command = commandExecutor.GetLastExecuted();
        
        if (command) {
            document.querySelector('.console-input').value = command;
        }
    }
});