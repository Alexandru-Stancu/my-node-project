var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var bodyParser = require('body-parser');
var User = require('./models/user');
var mongoose = require('mongoose');
var expressSession = require('express-session');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var passport = require('passport');
var localPassportStrategy = require('passport-local').Strategy;
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout-principal'}));
app.set('view engine', 'handlebars');

app.use(expressSession({
  secret: 'cuvant secret pentru sesiune',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// custom validator

app.use(expressValidator({
 customValidators: {
    isAlphaNum: function(value) {
        return /^[a-z0-9]+$/i.test(value); 
    }
 }
}));

app.use(flash());

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', index);
app.use('/users', users);

// app.post('/create-user', function(req, res, next) {
//   var newUser = new User();

//   newUser.name = req.body.name;
//   newUser.username = req.body.username;
//   newUser.password = req.body.password;
//   newUser.email = req.body.email;

//   newUser.save(function(err) {
//     if (err) return next(err);

//     res.json('user nou a fost creat cu succes');
//   });
// });

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
})