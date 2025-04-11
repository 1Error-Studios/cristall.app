function ValidateMDCode(code) {

}

function CleanUpMD(code) {
    let splittedCode = code.split('\n');

    for (let i = 0; i < splittedCode.length; i++) {
        let item = splittedCode[i];
        item = item.replace((/\r/ig), '');
        item = item.replace((/^    /i), '\t');

        splittedCode[i] = item;
    }

    return splittedCode;
}

function HandleMDCode(code) {
    let result = []; // elements
    let exclude = [];

    code.forEach((item, index) => {
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
                let itemsWithoutEdit = [];
                let items = [];
                
                for (let i = index; i < code.length; i++) {
                    if (!(/^(\-|\*|\+|\t\-|\t\*|\t\+)\s/i).test(code[i])) {
                        break;
                    }
                    else {
                        itemsWithoutEdit.push(code[i]);
                        items.push(code[i].replace('- ', '').replace(/(\-|\*|\+|)/i,  ''));
                        exclude.push(i);
                    }
                }

                let unorderedListItem = document.createElement('div');
                unorderedListItem.classList.add('md-block', 'md-unordered-list');
                unorderedListItem.setAttribute('contenteditable', true);
                unorderedListItem.setAttribute('original-content', itemsWithoutEdit.join('\n'));
                unorderedListItem.setAttribute('uuid', UUID());

                items.forEach(element => {
                    let tabs = (element.match(/\t/g) || []).length;
                    unorderedListItem.innerHTML += `<p class="md-unordered-list-item" style="text-indent: ${tabs * 10}px">${element}</p>`;
                })

                result.push(unorderedListItem);
            }
            else if ((/^\w+\.\s/i).test(item)) {
                let itemsWithoutEdit = [];
                let items = [];
                
                for (let i = index; i < code.length; i++) {
                    if (!(/^\w+\.\s/i).test(code[i])) {
                        break;
                    }
                    else {
                        itemsWithoutEdit.push(code[i]);
                        items.push(code[i].replace(/^\w+\.\s/i,  ''));
                        exclude.push(i);
                    }
                }

                let unorderedListItem = document.createElement('div');
                unorderedListItem.classList.add('md-block', 'md-ordered-list');
                unorderedListItem.setAttribute('contenteditable', true);
                unorderedListItem.setAttribute('original-content', itemsWithoutEdit.join('\n'));
                unorderedListItem.setAttribute('uuid', UUID());

                items.forEach((element, id) => {
                    unorderedListItem.innerHTML += `<p class="md-ordered-list-item">${id}. ${element}</p>`;
                })

                result.push(unorderedListItem);
            }
            else {
                let textItem = document.createElement('div');
                textItem.classList.add('md-block', `md-text`);
                textItem.setAttribute('contenteditable', true);
                textItem.setAttribute('original-content', item);
                textItem.setAttribute('uuid', UUID());
                textItem.textContent = item;

                result.push(textItem);
            }
        }
    });

    console.log(result);

    return result;
}