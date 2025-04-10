class Broker {
    constructor() {
        
    }

    static DEV_hide_loading_screen() {
        document.querySelector('.loader-screen').style = 'display: none;';

        TakeNote('{WEB}.{DEV_FUNC}.Broker.DEV_hide_loading_screen()', 'object .LOADER-SCREEN was disabled.');
    }
}