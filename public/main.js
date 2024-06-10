document.addEventListener('DOMContentLoaded', (event) => {
  const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
  setLanguage(savedLanguage);
});

function setLanguage(lang) {
  fetch(`/public/languages/${lang}/en.json`)
      .then(response => response.json())
      .then(data => {
          document.querySelectorAll('[data-i18n]').forEach(element => {
              const key = element.getAttribute('data-i18n');
              const keys = key.split('.');
              let translation = data;
              keys.forEach(k => {
                  translation = translation ? translation[k] : key;
              });
              element.textContent = translation || key;
          });
      })
      .catch(error => console.error('Error loading language file:', error));
}

document.querySelectorAll('#languageDropdown .dropdown-item').forEach(item => {
  item.addEventListener('click', (event) => {
    event.preventDefault();
    const selectedLang = event.target.getAttribute('href').split('=')[1];
    setLanguage(selectedLang);
    localStorage.setItem('selectedLanguage', selectedLang);
    location.reload();  // Reload the page to apply the new language
  });
});
