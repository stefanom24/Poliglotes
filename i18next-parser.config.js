module.exports = {
    input: [
      '**/*.{js,jsx,html,ejs}',
      '!node_modules/**',
      '!C:/Config.Msi/**'
    ],
    output: 'public/languages/$LOCALE.json',
};
  