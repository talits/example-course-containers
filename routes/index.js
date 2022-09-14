var express = require('express');
var router = express.Router();
var nconf = require('nconf');


nconf.file({ file: process.argv[2] || './dev-config.json' });

router.get('/', function(req, res, next) {
  res.render('index', {
    title: nconf.get('title'),
    message: nconf.get('message')
  });
});

module.exports = router;
