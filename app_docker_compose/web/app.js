var express = require("express");
var app = express();
var path = require("path");
app.use("/public", express.static(path.join(__dirname, 'node_modules')));
app.use('/img', express.static(path.join(__dirname, 'public/images')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/app', express.static(path.join(__dirname, 'app')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/app/index.html'));
})
app.listen(4004);
console.log("Rodando na porta 4004");