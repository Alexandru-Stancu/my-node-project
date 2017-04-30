var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;


var SchemaUser = mongoose.Schema({

    name: {
        type: String,
        index: true
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    }

});

var User = module.expors = mongoose.model('User', SchemaUser);

var newUser = new User({
    name: 'Test',
    username: 'usertest',
    password: 'testpass',
    email: 'test@exemplu.ro'
});

newUser.save().then(function(doc) {
    console.log('user-ul a fost salvat in baza de date', doc);
}, function(e) {
    console.log('eroare, nu a putut fi salvat user-ul in baza de date');
});