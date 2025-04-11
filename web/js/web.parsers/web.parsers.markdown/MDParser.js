function ValidateMDCode(code) {

}

function HandleMDCode(code) {
    let result = []; // elements
    let splittedCode = code.split('\n');
    let exclude = [];

    for (let i = 0; i < splittedCode.length; i++) {
        let item = splittedCode[i];
        item = item.replace((/\r/ig), '');
        item = item.replace((/^    /i), '\t');

        splittedCode[i] = item;
    }

    splittedCode.forEach((item, index) => {
        let line = index + 1;

        if (item !== '' && !exclude.includes(index)) {
            if ((/#/i).test(item)) {
                let prefix = item.split(' ')[0];
                let headerSize = prefix.length;
                let content = item.split(' ');
                content.splice(0, 1);
                content = content.join(' ');

                let headerItem = document.createElement('div');
                headerItem.classList.add('md-block', `md-header-${headerSize}`);
                headerItem.setAttribute('contenteditable', true);
                headerItem.setAttribute('original-content', item);
                headerItem.setAttribute('uuid', UUID());
                headerItem.textContent = content;

                result.push(headerItem);
            }
            else if ((/^(\-|\*|\+|\t\-|\t\*|\t\+)\s/i).test(item)) {
                let items = [];
                
                for (let i = index; i < splittedCode.length; i++) {
                    if (!(/^(\-|\*|\+|\t\-|\t\*|\t\+)\s/i).test(splittedCode[i])) {
                        break;
                    }
                    else {
                        items.push(splittedCode[i].replace('- ', '').replace(/(\-|\*|\+|)/i,  ''));
                        exclude.push(i);
                    }
                }

                let unorderedListItem = document.createElement('div');
                unorderedListItem.classList.add('md-block', 'md-unordered-list');
                unorderedListItem.setAttribute('contenteditable', true);
                unorderedListItem.setAttribute('original-content', item);
                unorderedListItem.setAttribute('uuid', UUID());

                items.forEach(element => {
                    let tabs = (element.match(/\t/g) || []).length;
                    unorderedListItem.innerHTML += `<p class="md-unordered-list-item" style="text-indent: ${tabs * 10}px">${element}</p>`;
                })

                result.push(unorderedListItem);
            }
        }
    });

    console.log(result);

    return result;
}

function OriginalToLoaded(element) {

}