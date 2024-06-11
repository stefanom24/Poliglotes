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
        ejs: ['HTMLLexer'], // Use HTMLLexer for EJS files
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
    output: 'public/languages/$LOCALE.json',
    sort: false,
    skipDefaultValues: false,
    useKeysAsDefaultValue: false,
    verbose: true,
};

module.exports = config;
