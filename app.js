const express = require('express');
const path = require('path');  // Importação do módulo path
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Deixando o node/express utilizar e ler arquivos html
app.use(express.urlencoded({ extended: true }));

// Definindo pasta de arquivos estáticos
app.use(express.static('public'));

app.set('view engine', 'ejs');

// Roteando pagina inicial
app.get('/', (req, res) => {
    res.render('index');
});

// Roteando pagina dashboard
app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

// Recebendo dados
app.post('', (req, res) => {
    //Fazer toda logica de escrever para json.
});

// Roteando pagina exercicios conversacao
app.get('/exeConversa', (req, res) => {
    res.render('exeConversa');
});

// Roteando pagina exercicios gramatica
app.get('/exeGramatica', (req, res) => {
    res.render('exeGramatica');
});

// Roteando pagina exercicios vocabulario
app.get('/exeVocab', (req, res) => {
    res.render('exeVocab');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', (req, res) => {
    const { username, email, password, plan } = req.body;
    
    // Add logic to create a user account
    // For example, save the user details to a database
    // Here, we'll just simulate success or failure

    // Simulating user creation
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
    }
    gravar(user, () => { // Passa a função `ler` como callback para ser chamada após `gravar`
        ler(() => {
            if(user.email == "stefanom24@gmail.com"){
                console.log('Login feito com sucesso!');
                res.redirect('/');
            }
        }) 
    });
});

app.listen(3000, () => {
    console.log('Servidor iniciado.');
});

function gravar(user, callback){
    const fs = require('fs');
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
};

function ler(callback){
    const fs = require('fs');
    fs.readFile('./login.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const login = JSON.parse(data);
        // Verifica se o caminho desejado existe antes de tentar acessá-lo
        if (login.users && login.users.length > 1) {
            console.log(login.users[1].email); // Supondo que você quer acessar o email do segundo usuário
        }  
    });
    callback();
};