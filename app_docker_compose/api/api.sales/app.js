var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var router = express.Router();
var http = require('http');
var saleController = require('./app/controllers/app.sale.controller');
var subscriber = require('./app/events/app.sale.subscribe.event');
var db = require('./config/db.config');
var cors = require("cors");

subscriber.subscribe();

app.set('PORT', process.env.PORT || 3001);

// resolvendo problema com o CORS
app.options('*', cors());

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,     Content-Type");
    next();
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    "extended": false
}));

app.use('/', saleController);

db
    .authenticate()
    .then(() => {
        console.log('Conectado ao sqlite com sucesso!');
        db.sync().then(function () {
            console.log('Sincronizando banco de dados');
        });
    })
    .catch(err => {
        console.error('Erro ao conectar com sqlite:', err);
    });

http.createServer(app).listen(app.get('PORT'), function () {
    console.log('Rodando na porta ' + app.get('PORT'));
});