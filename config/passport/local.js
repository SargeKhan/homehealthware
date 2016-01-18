
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var config = require('config');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');

/**
 * Expose
 */

module.exports = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        console.log("Authentication page");
        var options = {
            criteria: { email: email }
        };
        User.load(options, function (err, user) {

               console.log("Load user callback.");
                if (err) return done(err);

                console.log("Db didn't return error.");
                if (!user) {
                    console.log("User didn't exist error.");
                    return done(null, false, { message: 'Unknown user.' });
                }
                console.log("Password sent from client: "+ password)
                console.log("Email: "+ user.email )
                console.log("Hash: "+ user.hashed_password)
                bcrypt.compare(password, user.hashed_password,function(err, result){
                    console.log("Bycrpt compared didn't exist error. Result is" + result);
                    if(result)
                        return done(null, user);
                    else
                        return done(null, false, { message: 'Invalid password' });
                });
            }
        );
    }
);
