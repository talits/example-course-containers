let express = require('express');
let path = require('path');
let index = require('./routes/index');

let app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);

module.exports = app;
