const express = require('express');
const shell = require("shelljs");
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Call shell command */
router.get('/shell', function(req, res, next) {
  res.render('index', { title: 'Shell' });
  shell.echo("shell.exec works");
});

module.exports = router;
