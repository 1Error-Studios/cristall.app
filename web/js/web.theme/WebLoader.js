class ThemeWebLoader {
    constructor() {
        this.themes = [];

        this.activeTheme;
        this.root;
    }

    SetupRoot(rootElement) {
        if (!rootElement || !rootElement instanceof Element) {
            TakeNote('{WEB}.ThemeWebLoader.SetupRoot(Element)', 'FATAL ERROR: @rootElement not found or incorrect.');

            return;
        }

        this.root = rootElement;
    }

    LoadTheme(name, properties) {
        if (!name || typeof name !== 'string') {
            TakeNote('{WEB}.ThemeWebLoader.LoadTheme(string, object)', 'Theme @name not found or incorrect. SKIPPED');

            return;
        }

        if (name.length > 28) {
            TakeNote('{WEB}.ThemeWebLoader.LoadTheme(string, object)', 'Theme @name length is too long. Max is 28. SKIPPED');

            return;
        }

        if (typeof properties !== 'object' || Array.isArray(properties)) {
            TakeNote('{WEB}.ThemeWebLoader.LoadTheme(string, object)', 'Theme @properties not found or incorrect. SKIPPED');

            return;
        }

        if (Object.keys(properties).length === 0) {
            TakeNote('{WEB}.ThemeWebLoader.LoadTheme(string, object)', 'Theme @properties hasn\'t content. SKIPPED');

            return;
        }

        this.themes.push({
            index: this.themes.length,
            name,
            properties
        });
    }

    ChangeTheme(name) {

    }

    GetActiveThemeName() {
        return activeTheme;
    }

    LoadActiveTheme() {

    }
}