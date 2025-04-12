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
            else if ((/\>/i).test(item)) {
                let content = item.split(' ');
                content.splice(0, 1);
                content = content.join(' ');

                let quoteItem = document.createElement('div');
                quoteItem.classList.add('md-block', 'md-quote');
                quoteItem.setAttribute('contenteditable', true);
                quoteItem.setAttribute('original-content', item);
                quoteItem.setAttribute('uuid', UUID());
                quoteItem.textContent = content;

                result.push(quoteItem);
            }
            else if (item === '---') {
                let content = item.split(' ');
                content.splice(0, 1);
                content = content.join(' ');

                let quoteItem = document.createElement('div');
                quoteItem.classList.add('md-block', 'md-horizontal-line');
                quoteItem.setAttribute('contenteditable', true);
                quoteItem.setAttribute('original-content', item);
                quoteItem.setAttribute('uuid', UUID());
                quoteItem.innerHTML = '<div></div>';

                result.push(quoteItem);
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

                let unorderedListItem = document.createElement('ul');
                unorderedListItem.classList.add('md-block', 'md-unordered-list');
                unorderedListItem.setAttribute('contenteditable', true);
                unorderedListItem.setAttribute('original-content', itemsWithoutEdit.join('\n'));
                unorderedListItem.setAttribute('uuid', UUID());

                items.forEach(element => {
                    let tabs = (element.match(/\t/g) || []).length;
                    element = element.replace(/\t/ig, '');
                    unorderedListItem.innerHTML += `<li class="md-unordered-list-item" style="margin-left: ${tabs * 20}px">${element}</li>`;
                })

                result.push(unorderedListItem);
            }
            else if ((/^\`\`\`(.*?)/i).test(item)) {
                let itemsWithoutEdit = [];
                let items = [];
                
                for (let i = index; i < code.length; i++) {
                    itemsWithoutEdit.push(code[i]);
                    items.push(code[i]);
                    exclude.push(i);

                    if (code[i] === '```') {
                        break;
                    }
                }

                let language = item.replace('```', '');

                let assotiate = {
                    'js': 'javascript'
                }

                let codeItem = document.createElement('div');
                codeItem.classList.add('md-block', 'md-code-block');
                codeItem.setAttribute('contenteditable', true);
                codeItem.setAttribute('original-content', itemsWithoutEdit.join('\n'));
                codeItem.setAttribute('language', assotiate[language] ? assotiate[language] : language);
                codeItem.setAttribute('uuid', UUID());

                items.forEach(element => {
                    if (!element.includes('```')) {
                        codeItem.innerHTML += `<div class="md-code-line">${htmlEscape(element)}</div>`;
                    }
                });

                result.push(codeItem);
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

                if (Array.isArray(item.match(/`(.*?)`/ig))) {
                    let replaces = item.match(/`(.*?)`/ig);

                    replaces.forEach(expresion => {
                        let expresion_copy = String(expresion);
                        expresion_copy = expresion_copy.slice(1, expresion.length - 1);

                        if (expresion_copy.length > 0) {
                            item = item.replace(expresion, `<span class="md-text-inline-code">${expresion_copy}</span>`);
                        }
                    });
                }

                if (Array.isArray(item.match(/\[(.*?)\]\((.*?)\)/ig))) {
                    let replaces = item.match(/\[(.*?)\]\((.*?)\)/ig);

                    replaces.forEach(expresion => {
                        let expresion_copy = String(expresion);
                        let expresion_copy_title = expresion_copy.split('](')[0];
                        let expresion_copy_link = expresion_copy.split('](')[1];

                        expresion_copy_link = expresion_copy_link.slice(0, expresion_copy_link.length - 1);
                        expresion_copy_title = expresion_copy_title.slice(1, expresion_copy_title.length);

                        if (expresion_copy.length > 0) {
                            item = item.replace(expresion, `<a class="md-link" href="${expresion_copy_link}">${expresion_copy_title}</a>`);
                        }
                    });
                }

                if (Array.isArray(item.match(/_(.*?)_/ig))) {
                    let replaces = item.match(/_(.*?)_/ig);

                    replaces.forEach(expresion => {
                        let expresion_copy = String(expresion);
                        expresion_copy = expresion_copy.slice(1, expresion_copy.length - 1);

                        if (expresion_copy.length > 0) {
                            item = item.replace(expresion, `<p class="md-italic">${expresion_copy}</p>`);
                        }
                    });
                }

                if (Array.isArray(item.match(/__(.*?)__/ig))) {
                    let replaces = item.match(/__(.*?)__/ig);

                    replaces.forEach(expresion => {
                        let expresion_copy = String(expresion);
                        expresion_copy = expresion_copy.slice(2, expresion_copy.length - 2);

                        if (expresion_copy.length > 0) {
                            item = item.replace(expresion, `<p class="md-bold">${expresion_copy}</p>`);
                        }
                    });
                }

                if (Array.isArray(item.match(/\*(.*?)\*/ig))) {
                    let replaces = item.match(/\*(.*?)\*/ig);

                    replaces.forEach(expresion => {
                        let expresion_copy = String(expresion);
                        expresion_copy = expresion_copy.slice(1, expresion_copy.length - 1);

                        if (expresion_copy.length > 0) {
                            item = item.replace(expresion, `<p class="md-italic">${expresion_copy}</p>`);
                        }
                    });
                }

                if (Array.isArray(item.match(/\*\*(.*?)\*\*/ig))) {
                    let replaces = item.match(/\*\*(.*?)\*\*/ig);

                    replaces.forEach(expresion => {
                        let expresion_copy = String(expresion);
                        expresion_copy = expresion_copy.slice(2, expresion_copy.length - 2);

                        if (expresion_copy.length > 0) {
                            item = item.replace(expresion, `<p class="md-bold">${expresion_copy}</p>`);
                        }
                    });
                }

                if (Array.isArray(item.match(/\~\~(.*?)\~\~/ig))) {
                    let replaces = item.match(/\~\~(.*?)\~\~/ig);

                    replaces.forEach(expresion => {
                        let expresion_copy = String(expresion);
                        expresion_copy = expresion_copy.slice(2, expresion_copy.length - 2);

                        if (expresion_copy.length > 0) {
                            item = item.replace(expresion, `<p class="md-strikethrough">${expresion_copy}</p>`);
                        }
                    });
                }

                textItem.innerHTML = item;

                result.push(textItem);
            }
        }
    });

    // console.log(result);

    return result;
}

function HighlightAllCode() {
    document.querySelectorAll('.md-code-line').forEach(item => {
        item.innerHTML = hljs.highlight(
            item.textContent,
            { language: item.parentElement.getAttribute('language') }
        ).value;
    });
}

function htmlEscape(text) {
    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function TabFix() {
    document.querySelectorAll('.md-block').forEach(item => {
        $(item).on('keydown', function(e) {
            if (e.which == 9) {
                e.preventDefault();

                document.execCommand('insertHTML', false,  '\t');
            }
        });
    });
}