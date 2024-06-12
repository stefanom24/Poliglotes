const axios = require('axios');
const fs = require('fs');
const path = require('path');

const languages = ['es', 'pt', 'fr']; // Add other languages as needed

const enTranslations = require('./public/languages/en/translation.json');

async function translateText(text, lang) {
  try {
    const response = await axios.get('https://api.mymemory.translated.net/get', {
      params: {
        q: text,
        langpair: `en|${lang}`
      }
    });
    if (response.data.responseData.translatedText) {
      return response.data.responseData.translatedText;
    } else {
      console.error('Translation error:', response.data);
      return text; // Fallback to the original text if translation fails
    }
  } catch (error) {
    console.error(`Error translating text: "${text}"`, error);
    return text; // Fallback to the original text if translation fails
  }
}

async function translateObject(obj, lang) {
  const translatedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      translatedObj[key] = await translateText(obj[key], lang);
    }
  }
  return translatedObj;
}

async function translateAndSave(lang) {
  const translatedObj = await translateObject(enTranslations, lang);
  const outputPath = path.join(__dirname, `./public/languages/${lang}/translation.json`);
  fs.writeFileSync(outputPath, JSON.stringify(translatedObj, null, 2));
}

async function translateAll() {
  for (const lang of languages) {
    await translateAndSave(lang);
  }
}

translateAll().then(() => console.log('Translation completed.'));
