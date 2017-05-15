var express = require('express');
var router = express.Router();

router.get('/registration', function (req, res) {
  res.render('registration');
});

router.get('/login', function (req, res) {
  res.render('login');
});

router.get('/logout', function (req, res) {
  res.render('logout');
});

module.exports = router;