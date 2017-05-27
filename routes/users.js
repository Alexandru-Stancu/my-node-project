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
  req.checkBody('name', 'trebuie să îți introduci numele').notEmpty();
  req.checkBody('username', 'trebuie să îți alegi un username cu cel puțin 4 caractere alfanumerice').len(4,20).isAlphaNum();
  req.checkBody('email', 'o adresă valabilă de email este necesară').notEmpty().isEmail();
  req.checkBody('password', 'parola trebuie să conțină cel puțin 6 caractere alfanumerice').len(6, 20).isAlphaNum();
  req.checkBody('password', 'parola nu corespunde').equals(confirmPassword);

  // rezultatul validarii returnat ca promisiune
  req.getValidationResult().then(function(result){
    var errBoolean = result.isEmpty();
    var errors = result.mapped();

    if (errBoolean) {
      console.log('no errors');
    } else {
      console.log('erori: ', errors);
    }

    });
});

module.exports = router;