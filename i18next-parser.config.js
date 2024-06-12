const config = {
    contextSeparator: '_',
    createOldCatalogs: false,
    defaultNamespace: 'translation',
    defaultValue: '',
    indentation: 2,
    keepRemoved: false,
    keySeparator: false,
    lexers: {
        hbs: ['HandlebarsLexer'],
        handlebars: ['HandlebarsLexer'],
        html: ['HTMLLexer'],
        ejs: ['JavascriptLexer'],
        functions: ['t'],
        js: ['JavascriptLexer'],
        jsx: ['JsxLexer'],
        mjs: ['JavascriptLexer'],
        ts: ['TypescriptLexer'],
        tsx: ['TypescriptLexer'],
        default: ['JavascriptLexer']
    },
    lineEnding: 'auto',
    locales: ['en', 'es', 'pt', 'fr'], // Add other languages as needed
    namespaceSeparator: false,
    input: [
        '**/*.{js,jsx,html,ejs}',
        '!node_modules/**',
        '!C:/Config.Msi/**'
    ],
    output: 'public/languages/$LOCALE/$NAMESPACE.json', // Adjusted to output per language directory
    sort: false,
    skipDefaultValues: false,
    useKeysAsDefaultValue: true,
    verbose: true,
};

module.exports = config;
