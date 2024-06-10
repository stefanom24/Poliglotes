const fs = require('fs');
const path = require('path');
const axios = require('axios');

const languages = ['es', 'fr', 'pt']; // Add other languages as needed

// Function to translate a single text using MyMemory API
async function translateText(text, targetLanguage) {
    if (!text) {
        return text; // Return the original text if it's empty
    }

    try {
        console.log(`Requesting translation for: "${text}" to ${targetLanguage}`);
        const response = await axios.get('https://api.mymemory.translated.net/get', {
            params: {
                q: text,
                langpair: `en|${targetLanguage}`
            }
        });

        console.log(`API Response for "${text}" to ${targetLanguage}: ${JSON.stringify(response.data)}`);

        if (response.data.responseStatus === 200) {
            return response.data.responseData.translatedText;
        } else {
            console.error(`Error translating text: ${text}`, response.data);
            return text; // Fallback to original text in case of error
        }
    } catch (error) {
        console.error(`Error translating text: ${text}`, error);
        return text; // Fallback to original text in case of error
    }
}

// Function to translate a JSON object
async function translateObject(obj, targetLanguage) {
    const translatedObj = {};
    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            translatedObj[key] = await translateObject(obj[key], targetLanguage);
        } else {
            translatedObj[key] = await translateText(obj[key], targetLanguage);
        }
    }
    return translatedObj;
}

// Function to process a single file
async function processFile(filePath, languages) {
    console.log(`Processing file: ${filePath}`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    for (const lang of languages) {
        console.log(`Translating to language: ${lang}`);
        const translatedData = await translateObject(data, lang);
        const outputDir = path.join(path.dirname(filePath), lang); // Adjusting the path
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }
        fs.writeFileSync(path.join(outputDir, path.basename(filePath)), JSON.stringify(translatedData, null, 2));
        console.log(`File written: ${path.join(outputDir, path.basename(filePath))}`);
    }
}

// Main function to translate all files in a directory
async function translateDirectory(directory, languages) {
    console.log(`Translating files in directory: ${directory}`);
    const files = fs.readdirSync(directory).filter(file => file.endsWith('.json'));
    for (const file of files) {
        await processFile(path.join(directory, file), languages);
    }
}

// Translate all JSON files in the public/languages directory
translateDirectory(path.join(__dirname, 'public', 'languages'), languages)
    .then(() => console.log('Translation completed'))
    .catch(error => console.error('Error during translation', error));
