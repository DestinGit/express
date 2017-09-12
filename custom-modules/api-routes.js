const express = require('express');
const routerAPI = express.Router();

// Middleware qui intercepte toutes les routes et test le query string
// adresse:port:/api/*?key=123
routerAPI.use('/*', (request, response, next)=>{
    let key = request.query.key;
    if(key !== "123") {
        response.status(403).send("Accès interdit");
    } else {
        next();
    }
});

// Route avec réponse JSON
routerAPI.get('/hello/:name', (request,response)=>{
    let data = {message: "Hello " + request.params.name};
    response.status(200).json(data);
});

module.exports = routerAPI;