class CSSLoader {
    static PluginToCSSParse(styleBlock, pluginFire) {
        if (!styleBlock['selector']) {
            TakeNote('CSSLoader.PluginToCSSParse(element, pluginFire)', 'FATAL: styleBlock hasn\'t selector.');

            return;
        }

        if (Array.isArray(styleBlock['styles']) || Object.keys(styleBlock['styles']).length === 0) {
            TakeNote('CSSLoader.PluginToCSSParse(element, pluginFire)', 'WARNING: can\'t create styleBlock without styles.');

            return;
        }

        return `[style-selector-id="${pluginFire}.${styleBlock['selector']}"]\n{\n${Object.keys(styleBlock['styles']).map(item => `\t${item}: ${styleBlock['styles'][item]}\n`).join('\n')}}\n`;
    }
}