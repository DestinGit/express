const express = require('express');
const app = express();
const logger = require('morgan');
const fs = require('fs');
const bodyParser = require('body-parser');
const adminRoutes = require('./custom-modules/admin-routes');
const apiRoutes = require('./custom-modules/api-routes');
const mainRoutes = require('./custom-modules/main-routes');

const users = [
    {id:1, name:'Joe'},
    {id:2, name:'Jack'},
    {id:3, name:'Tino'}
];

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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

var nameTransformer = (req, res, next, name) => {
    req.params.name = name.toString().toUpperCase();
    next();
};

// Intercepter le paramètre 'name' des routes : '/hello/:name' et '/api/hello/:name'
mainRoutes.param('name', nameTransformer);
apiRoutes.param('name', nameTransformer);

// Interception de cette route : '/hello/:userId(\\d+)'
mainRoutes.param('userId', (req, res, next, userId) => {
    let user = users.find((item) => item.id === parseInt(userId));
    user = user || {id: null, name: 'guest'};

    req.currentUser = user;

    next();
});

app.use('/admin', adminRoutes);

app.use('/api', apiRoutes);

app.use(mainRoutes);


app.listen(3000);
