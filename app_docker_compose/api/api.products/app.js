var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var router = express.Router();
var http = require('http');
var productController = require('./app/controllers/app.products.controller');
var subscriberProduct = require('./app/events/app.products.subscribe.event');
var subscriberSale = require('./app/events/app.sale.subscribe.event');
var db = require('./config/db.config');
var cors = require("cors");

subscriberProduct.subscribe();
subscriberSale.subscribe();

app.set('PORT', process.env.PORT || 3000);

// aqui resolvemos o problema do cors
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

app.use('/', productController);

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