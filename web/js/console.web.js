let commandExecutor = new CommandExecutor();
let cristallConsole = new CristallConsole();

cristallConsole.Initialize(
    document.querySelector('.console-input'),
    document.querySelector('.console-button'),
    document.querySelector('.block-messages-field')
);

cristallConsole.SetupEvents();

function HandleLogMessages(data) {
    data.forEach(item => {
        let message = document.createElement('div');
        message.classList.add('log-message');

        let messageIconFrame = document.createElement('div');
        messageIconFrame.classList.add('message-icon');
        let messageContentFrame = document.createElement('div');
        messageContentFrame.classList.add('message-content');

        let messageTitle = document.createElement('div');
        messageTitle.classList.add('content-title');
        messageTitle.textContent = item.title;

        if (item.message.includes('FATAL', 'ERROR', 'FAILED')) {
            messageTitle.classList.add('message-title-error');

            messageIconFrame.innerHTML = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M10.9999 20.1666C16.0599 20.1666 20.1666 16.0599 20.1666 10.9999C20.1666 5.93992 16.0599 1.83325 10.9999 1.83325C5.93992 1.83325 1.83325 5.93992 1.83325 10.9999C1.83325 16.0599 5.93992 20.1666 10.9999 20.1666Z" stroke="#C44A4A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/> <path d="M17.325 4.58325L4.4917 17.4166" stroke="#C44A4A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/> </svg>`;
        }
        else if (item.message.includes('INFO')) {
            messageTitle.classList.add('message-title-info');

            messageIconFrame.innerHTML = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M11 14.8958V10.0833" stroke="#007AFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M2.67665 14.1351V7.86508C2.67665 6.83842 3.22665 5.88504 4.11582 5.36254L9.56082 2.21838C10.45 1.70505 11.55 1.70505 12.4483 2.21838L17.8933 5.36254C18.7825 5.87588 19.3325 6.82925 19.3325 7.86508V14.1351C19.3325 15.1617 18.7825 16.1151 17.8933 16.6376L12.4483 19.7817C11.5592 20.2951 10.4592 20.2951 9.56082 19.7817L4.11582 16.6376C3.22665 16.1151 2.67665 15.1709 2.67665 14.1351Z" stroke="#007AFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M11 7.1499V7.05824" stroke="#007AFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </svg>`;
        }
        else if (item.message.includes('SUCCESS')) {
            messageTitle.classList.add('message-title-success');

            messageIconFrame.innerHTML = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M8.24992 20.1666H13.7499C18.3333 20.1666 20.1666 18.3333 20.1666 13.7499V8.24992C20.1666 3.66659 18.3333 1.83325 13.7499 1.83325H8.24992C3.66659 1.83325 1.83325 3.66659 1.83325 8.24992V13.7499C1.83325 18.3333 3.66659 20.1666 8.24992 20.1666Z" stroke="#34C759" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M7.10425 10.9999L9.69841 13.5941L14.8959 8.40576" stroke="#34C759" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>`;
        }
        else if (item.message.includes('WARNING')) {
            messageTitle.classList.add('message-title-warning');

            messageIconFrame.innerHTML = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M11 8.25V12.8333" stroke="#FFCC00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M10.9999 19.6258H5.4449C2.26406 19.6258 0.934898 17.3525 2.4749 14.575L5.3349 9.42334L8.0299 4.58334C9.66156 1.64084 12.3382 1.64084 13.9699 4.58334L16.6649 9.43251L19.5249 14.5842C21.0649 17.3617 19.7266 19.635 16.5549 19.635H10.9999V19.6258Z" stroke="#FFCC00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M10.9949 15.5833H11.0031" stroke="#FFCC00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </svg>`;
        }
        else {
            messageTitle.classList.add('message-title-info');

            messageIconFrame.innerHTML = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M11 14.8958V10.0833" stroke="#007AFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M2.67665 14.1351V7.86508C2.67665 6.83842 3.22665 5.88504 4.11582 5.36254L9.56082 2.21838C10.45 1.70505 11.55 1.70505 12.4483 2.21838L17.8933 5.36254C18.7825 5.87588 19.3325 6.82925 19.3325 7.86508V14.1351C19.3325 15.1617 18.7825 16.1151 17.8933 16.6376L12.4483 19.7817C11.5592 20.2951 10.4592 20.2951 9.56082 19.7817L4.11582 16.6376C3.22665 16.1151 2.67665 15.1709 2.67665 14.1351Z" stroke="#007AFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M11 7.1499V7.05824" stroke="#007AFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </svg>`;
        }

        let messageDescription = document.createElement('div');
        messageDescription.classList.add('content-text');
        messageDescription.textContent = item.message;

        messageContentFrame.append(messageTitle);
        messageContentFrame.append(messageDescription);

        message.append(messageIconFrame);
        message.append(messageContentFrame);

        document.querySelector('.block-log-messages').append(message);
    });
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

window.electronAPI.on('update-log', (event, data) => {
    let item = JSON.parse(data);

    let message = document.createElement('div');
    message.classList.add('log-message');

    let messageIconFrame = document.createElement('div');
    messageIconFrame.classList.add('message-icon');
    let messageContentFrame = document.createElement('div');
    messageContentFrame.classList.add('message-content');

    let messageTitle = document.createElement('div');
    messageTitle.classList.add('content-title');
    messageTitle.textContent = item.title;

    messageTitle.innerHTML += `<div class="title-new-block">new</div>`;

    if (item.message.includes('FATAL', 'ERROR', 'FAILED')) {
        messageTitle.classList.add('message-title-error');

        messageIconFrame.innerHTML = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M10.9999 20.1666C16.0599 20.1666 20.1666 16.0599 20.1666 10.9999C20.1666 5.93992 16.0599 1.83325 10.9999 1.83325C5.93992 1.83325 1.83325 5.93992 1.83325 10.9999C1.83325 16.0599 5.93992 20.1666 10.9999 20.1666Z" stroke="#C44A4A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/> <path d="M17.325 4.58325L4.4917 17.4166" stroke="#C44A4A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/> </svg>`;
    }
    else if (item.message.includes('INFO')) {
        messageTitle.classList.add('message-title-info');

        messageIconFrame.innerHTML = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M11 14.8958V10.0833" stroke="#007AFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M2.67665 14.1351V7.86508C2.67665 6.83842 3.22665 5.88504 4.11582 5.36254L9.56082 2.21838C10.45 1.70505 11.55 1.70505 12.4483 2.21838L17.8933 5.36254C18.7825 5.87588 19.3325 6.82925 19.3325 7.86508V14.1351C19.3325 15.1617 18.7825 16.1151 17.8933 16.6376L12.4483 19.7817C11.5592 20.2951 10.4592 20.2951 9.56082 19.7817L4.11582 16.6376C3.22665 16.1151 2.67665 15.1709 2.67665 14.1351Z" stroke="#007AFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M11 7.1499V7.05824" stroke="#007AFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </svg>`;
    }
    else if (item.message.includes('SUCCESS')) {
        messageTitle.classList.add('message-title-success');

        messageIconFrame.innerHTML = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M8.24992 20.1666H13.7499C18.3333 20.1666 20.1666 18.3333 20.1666 13.7499V8.24992C20.1666 3.66659 18.3333 1.83325 13.7499 1.83325H8.24992C3.66659 1.83325 1.83325 3.66659 1.83325 8.24992V13.7499C1.83325 18.3333 3.66659 20.1666 8.24992 20.1666Z" stroke="#34C759" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M7.10425 10.9999L9.69841 13.5941L14.8959 8.40576" stroke="#34C759" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>`;
    }
    else if (item.message.includes('WARNING')) {
        messageTitle.classList.add('message-title-warning');

        messageIconFrame.innerHTML = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M11 8.25V12.8333" stroke="#FFCC00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M10.9999 19.6258H5.4449C2.26406 19.6258 0.934898 17.3525 2.4749 14.575L5.3349 9.42334L8.0299 4.58334C9.66156 1.64084 12.3382 1.64084 13.9699 4.58334L16.6649 9.43251L19.5249 14.5842C21.0649 17.3617 19.7266 19.635 16.5549 19.635H10.9999V19.6258Z" stroke="#FFCC00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M10.9949 15.5833H11.0031" stroke="#FFCC00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </svg>`;
    }
    else {
        messageTitle.classList.add('message-title-info');

        messageIconFrame.innerHTML = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M11 14.8958V10.0833" stroke="#007AFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M2.67665 14.1351V7.86508C2.67665 6.83842 3.22665 5.88504 4.11582 5.36254L9.56082 2.21838C10.45 1.70505 11.55 1.70505 12.4483 2.21838L17.8933 5.36254C18.7825 5.87588 19.3325 6.82925 19.3325 7.86508V14.1351C19.3325 15.1617 18.7825 16.1151 17.8933 16.6376L12.4483 19.7817C11.5592 20.2951 10.4592 20.2951 9.56082 19.7817L4.11582 16.6376C3.22665 16.1151 2.67665 15.1709 2.67665 14.1351Z" stroke="#007AFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M11 7.1499V7.05824" stroke="#007AFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </svg>`;
    }

    let messageDescription = document.createElement('div');
    messageDescription.classList.add('content-text');
    messageDescription.textContent = item.message;

    messageContentFrame.append(messageTitle);
    messageContentFrame.append(messageDescription);

    message.append(messageIconFrame);
    message.append(messageContentFrame);

    document.querySelector('.block-log-messages').append(message);

    document.querySelector('.block-log-messages').scrollTo(0, document.querySelector('.block-log-messages').scrollHeight);
});

let activeTab = 'console';

function ChangeTab(tabId) {
    document.querySelector(`[content-control-id="${activeTab}"]`).classList.remove('button-active');
    document.querySelector(`[content-id="${activeTab}"]`).style = 'display: none;';

    activeTab = tabId;

    document.querySelector(`[content-control-id="${activeTab}"]`).classList.add('button-active');
    document.querySelector(`[content-id="${activeTab}"]`).style = '';
}

document.querySelectorAll('[content-control-id]').forEach(item => {
    item.addEventListener('click', event => {
        ChangeTab(item.getAttribute('content-control-id'));
    });
});