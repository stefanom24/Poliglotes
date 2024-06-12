const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');
const Backend = require('i18next-fs-backend');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser());

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: path.join(__dirname, 'public/languages/{{lng}}/translation.json'), // Corrected path
    },
    fallbackLng: 'en',
    preload: ['en', 'es', 'fr', 'pt'], // Preload all languages
    saveMissing: true,
    keySeparator: false, // To use keys with dots freely
    interpolation: {
      escapeValue: false, // Not needed for node
    },
  });

app.use(i18nextMiddleware.handle(i18next));

app.use((req, res, next) => {
  res.locals.t = req.t;
  res.locals.lng = req.language;
  next();
});

app.get('/change-lang', (req, res) => {
  let lang = req.query.lang;
  if (lang) {
    req.i18n.changeLanguage(lang);
  }
  res.redirect('back');
});

// Roteando pagina inicial
app.get('/', (req, res) => {
  res.render('index', { lng: req.language });
});

// Roteando pagina dashboard
app.get('/dashboard', (req, res) => {
  res.render('dashboard', { lng: req.language });
});


// Roteando pagina exercicios conversacao
app.get('/exeConversa', (req, res) => {
  res.render('exeConversa', { lng: req.language });
});

// Roteando pagina exercicios gramatica
app.get('/exeGramatica', (req, res) => {
  res.render('exeGramatica', { lng: req.language });
});

// Roteando pagina exercicios vocabulario
app.get('/exeVocab', (req, res) => {
  res.render('exeVocab', { lng: req.language });
});

// Roteando pagina signup
app.get('/signup', (req, res) => {
  res.render('signup', { lng: req.language });
});

app.post('/signup', (req, res) => {
  const { username, email, password, plan } = req.body;
  // Add logic to create a user account
  // For example, save the user details to a database
  // Here, we'll just simulate success or failure
  const success = true; // Change this based on actual user creation logic

  if (success) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'Unable to create account. Please try again.' });
  }
});

// Recebendo dados do Login
app.post('/login', (req, res) => {
  let email = req.body.loginEmail;
  let password = req.body.loginPassword;

  let user = {
    "email": email,
    "password": password
  };

  gravar(user, () => { 
    ler(() => {
      if (user.email == "stefanom24@gmail.com") {
        console.log('Login feito com sucesso!');
        res.redirect('/');
      }
    });
  });
});

// Endpoint to get translations
app.get('/languages/:lang', (req, res) => {
  const lang = req.params.lang;
  const filePath = path.join(__dirname, `public/languages/${lang}/translation.json`);

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(404).send('Language file not found');
    }
    res.json(JSON.parse(data));
  });
});

app.listen(3000, () => {
  console.log('Servidor iniciado.');
});

function gravar(user, callback) {
  let loginFile;
  try {
    loginFile = require('./login.json');
  } catch (error) {
    loginFile = { users: [] }; // Cria um novo objeto se o arquivo não existir
  }
  loginFile.users.push(user);
  fs.writeFile('login.json', JSON.stringify(loginFile), err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Gravado');
    callback(); // Chama `ler` somente após o arquivo ser gravado
  });
}

function ler(callback) {
  fs.readFile('./login.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const login = JSON.parse(data);
    if (login.users && login.users.length > 1) {
      console.log(login.users[1].email); // Supondo que você quer acessar o email do segundo usuário
    }
    callback();
  });
}
