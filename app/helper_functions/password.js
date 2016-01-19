/**
 *
 * Created by usman on 1/18/16.
 */

var bcrypt = require("bcrypt");

exports.hashPassword = function(password, cb) {
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            var err = new Error("Error hashing password.");
            next(err);
        } else {
            console.log(hash);
            cb(hash)
        }
    });
};
