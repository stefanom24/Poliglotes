document.querySelectorAll('#languageDropdown .dropdown-item').forEach(item => {
  item.addEventListener('click', (event) => {
    event.preventDefault();
    const selectedLang = event.target.getAttribute('href').split('=')[1];
    setLanguage(selectedLang);
    localStorage.setItem('selectedLanguage', selectedLang);
    location.reload();  // Reload the page to apply the new language
  });
});

function setLanguage(lang) {
  fetch(`/languages/${lang}/translation.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(data, key);
        element.textContent = translation || key;
      });
    })
    .catch(error => console.error('Error loading language file:', error));
}

function getTranslation(data, key) {
  const keys = key.split('.');
  let translation = data;
  keys.forEach(k => {
    translation = translation[k];
  });
  return translation;
}

window.onload = function() {
  const selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';
  setLanguage(selectedLanguage);
};
