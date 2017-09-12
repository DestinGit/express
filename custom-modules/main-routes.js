const express = require('express');
const routerMAIN = express.Router();

// Route simple
routerMAIN.get('/hello', (request, response) => {
    response.send('Hello Boy');
});

// Route simple avec un paramètre et une expression régulière
// l'ensemble de la chaine peut être en expression régulière.
// Exemple: app.get('*',(..,..)=>{}); répond à toutes les routes
routerMAIN.get('/hello/:userId(\\d+)', (req, res) => {
    let message = `hello votre id est : ${req.currentUser.name}`;
    res.send(message);
});


// Route simple avec un paramètre
routerMAIN.get('/hello/:name', (request, response) => {
    let message = `hello ${request.params.name}`;
    response.send(message);
});

// Query String
// Exemple d'url: /hello-qs?name=destin
// le query est un objet json avec des clés. Exemple: {name=destin, ...}
routerMAIN.get('/hello-qs', (request,response)=>{
    let name = request.query.name;
    let message = "Hello " + name;
    response.send(message);
});

routerMAIN.get('/login/:password', (req, res) => {
    if (req.params.password !== '123') {
        res.redirect('/error');
    } else {
        res.send('Accès autorisé');
        // res.redirect('/hello');
    }
});

// Route avec un code de status
routerMAIN.get('/error', (request,response)=>{
    response.status(403).send("Accès refusé");
});


routerMAIN.post('/process-form', (req, res) => {
    let data = {message: `Bonjour ${req.body.firstName} ${req.body.name}`};
    res.json(data);
});

module.exports = routerMAIN;