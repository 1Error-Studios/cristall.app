class HTMLLoader {
    static PluginToHTMLParse(element) {
        if (!element['html_tag']) {
            TakeNote('HTMLLoader.PluginToHTMLParse(element)', 'FATAL: element has\'nt attribute html_tag');

            return;
        }

        let readyElement = document.createElement(element['html_tag']);

        if (element['attributes'] && Array.isArray(element['attributes'])) {
            element['attributes'].forEach(attribute => {
                readyElement.setAttribute(attribute.name, attribute.value);
            });
        }
        else {
            TakeNote('HTMLLoader.PluginToHTMLParse(element)', 'INFO: element\'s attributes not defined. skipped.');
        }

        if (element['content']) {
            switch(element['content']['type']) {
                case "text":
                    readyElement.textContent = element['content']['value'];
                    break;
                case "markup":
                    if (Array.isArray(element['content']['value'])) {
                        element['content']['value'].forEach(children => {
                            let buildedChildren = HTMLLoader.PluginToHTMLParse(children);

                            if (buildedChildren instanceof Element) {
                                readyElement.append(buildedChildren);
                            }
                        });
                    }
                    break;
                default:
                    TakeNote('HTMLLoader.PluginToHTMLParse(element)', `INFO: element\'s content variant @${element['content']['type']} skipped.`);
            }
        }

        return readyElement;
    }
}