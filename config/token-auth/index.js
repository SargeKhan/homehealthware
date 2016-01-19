/**
 *
 * Created by usman on 1/19/16.
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');

console.log("read token-auth");
function checkHeader(req) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
    } else {
        return null;
    }
};

exports.ensureAuthentication = function(req, res, next){
    req = checkHeader(req);
    User.findOne({token: req.token}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            req.user = user;
            next();
        }
    });
};
