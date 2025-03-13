class DropDown {
    constructor(id, view, text, list) {
        this.dropDownID = document.querySelector(id);
        this.dropDownView = document.querySelector(view);
        this.dropDownText = document.querySelector(text);
        this.dropDownList = document.querySelector(list);

        this.entries = [];
        this.entriesHTML = [];
        this.activeEntry = null;
    }

    LoadEntries(listOfEntries) {
        this.entries = listOfEntries;

        this.entries.forEach(item => {
            let entry = document.createElement('div');

            entry.classList.add('settings-field-option-drop-down-list-item');
            entry.setAttribute('entry-name', item.name);
            entry.setAttribute('entry-value', item.value);
            entry.innerHTML = item.icon + item.name;

            this.entriesHTML.push(entry);
            this.dropDownList.append(entry);
        });
    }

    ChangeActiveEntry(entryName) {
        if (this.activeEntry) {
            document.querySelector(`[entry-name="${this.activeEntry}"]`).style = '';
        }

        this.activeEntry = entryName;

        this.dropDownText.innerHTML = this.entries.find(item => item.name === entryName).icon + this.activeEntry;

        document.querySelector(`[entry-name="${this.activeEntry}"]`).style = 'display: none;';
    }

    SetupEvents() {
        this.dropDownView.addEventListener('click', (event) => {
            if (this.dropDownList.style.length > 0) {
                this.dropDownList.style = '';
            }
            else {
                this.dropDownList.style = 'display: none';
            }
        })
    }

    SetupEventsForEntries(callback) {
        if (this.entriesHTML.length > 0) {
            this.entriesHTML.forEach(item => {
                item.addEventListener('click', (event) => {
                    callback(item);
                });
            });
        }
    }

    CloseDropDown() {
        this.dropDownList.style = 'display: none';
    }
}