function Alert(title, text, activeTime) {
    if (document.querySelector('.notifications').children.length === 5) {
        return;
    }

    let notification = document.createElement('div');
    let titleElement = document.createElement('h3');
    let textElement = document.createElement('p');

    notification.classList.add('notification');
    titleElement.classList.add('notification-title');
    textElement.classList.add('notification-text');

    titleElement.textContent = title;
    textElement.textContent = text;

    notification.append(titleElement);
    notification.append(textElement);

    notification.style = 'display: none; opacity: 0;';

    document.querySelector('.notifications').append(notification);

    $(notification).css({
        display: 'flex'
    });

    $(notification).animate({
        opacity: 1
    }, 220, () => {
        setTimeout(() => {
            $(notification).animate({
                opacity: 0
            }, 220, () => {
                notification.remove();
            });
        }, activeTime);
    });
}