var express = require('express');
var exphbs  = require('express-handlebars');
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

router.post('/registration', function(req, res) {
  
  var name = req.body.name;
  var username = req.body.username;
  var password = req.body.password;
  var confirmPassword = req.body.confirmpassword;
  var email = req.body.email;

  // validarea formularului

req.checkBody('email', 'required').notEmpty();
req.checkBody('email', 'valid email required').isEmail();
req.checkBody('password', '6 to 20 characters required').len(6, 20);


  req.getValidationResult().then(function(result){
    var errBoolean = result.isEmpty();
    var errors = result.array();

    if (errBoolean) {
      console.log('no errors');
    } else {
      console.log('erori: ', errors);
    }

    });
});

module.exports = router;