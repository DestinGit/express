const express = require('express');
const app = express();
const logger = require('morgan');
const fs = require('fs');

let logStream = fs.createWriteStream(__dirname + '/log.txt', {
    flags: 'a',
    defaultEncoding: 'utf8',
    fd: null,
    mode: 0o666,
    autoClose: true,
    start: 0
});
app.use(logger('combined', {stream: logStream}));

// 1 - Une route static sans paramètre
app.use(express.static(__dirname + '/public'));

// Middleware qui intercepte toutes les routes et test le query string
// adresse:port:/*?key=123
// app.use((request, response, next)=>{
//     let key = request.query.key;
//     if(key !== "123") {
//         response.status(403).send("Accès interdit");
//     } else {
//         next();
//     }
// });
app.use('/api/*', (request, response, next)=>{
    let key = request.query.key;
    if(key !== "123") {
        response.status(403).send("Accès interdit");
    } else {
        next();
    }
});

// 2 - Des routes dinamiques avec éventuellement des paramètres

// Route simple
app.get('/hello', (request, response) => {
    response.send('Hello Boy');
});

// Route simple avec un paramètre et une expression régulière
// l'ensemble de la chaine peut être en expression régulière.
// Exemple: app.get('*',(..,..)=>{}); répond à toutes les routes
app.get('/hello/:id(\\d+)', (req, res) => {
    let message = `hello votre id est : ${req.params.id}`;
    res.send(message);
});

// Route simple avec un paramètre
app.get('/hello/:name', (request, response) => {
    let message = `hello ${request.params.name}`;
    response.send(message);
});

// Route avec réponse JSON
app.get('/api/hello/:name', (request,response)=>{
    let data = {message: "Hello " + request.params.name};
    response.status(200).json(data);
});

// Query String
// Exemple d'url: /hello-qs?name=destin
// le query est un objet json avec des clés. Exemple: {name=destin, ...}
app.get('/hello-qs', (request,response)=>{
    let name = request.query.name;
    let message = "Hello " + name;
    response.send(message);
});

app.get('/login/:password', (req, res) => {
    if (req.params.password !== '123') {
        res.redirect('/error');
    } else {
        res.send('Accès autorisé');
        // res.redirect('/hello');
    }
});

// Route avec un code de status
app.get('/error', (request,response)=>{
    response.status(403).send("Accès refusé");
});

app.listen(3000);