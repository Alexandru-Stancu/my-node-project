var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('conectat la baza de date');
    }
});
var db = mongoose.connection;


var SchemaUser = mongoose.Schema({


    name: {
        type: String,
        index: true
    },
    username: {
        type: String,
        minlength: 4,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true
    },
});


SchemaUser.pre('save', function(next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

var User = mongoose.model('User', SchemaUser);

module.exports = User;

// var newUser = new User({
//     name: 'Test',
//     username: 'usertest',
//     password: 'testpass',
//     email: 'test@exemplu.ro'
// });

// newUser.save().then(function(doc) {
//     console.log('user-ul a fost salvat in baza de date', doc);
// }, function(e) {
//     console.log('eroare, nu a putut fi salvat user-ul in baza de date');
// });