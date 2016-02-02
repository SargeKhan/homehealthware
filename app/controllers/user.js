/**
 *
 * Created by usman on 1/30/16.
 */


var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var mongoose = require('mongoose');
var User = mongoose.model('User');
var helper = require('../helper_functions/password');


exports.login = function(req, res) {
    console.log("Password recvd while login user:" + req.body.password);
    User.findOne({email: req.body.email}, '+hashed_password',function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                bcrypt.compare(req.body.password, user.hashed_password, function(err,result) {
                    console.log("Bcrypt returns: " + result);
                    if(err){
                        res.status(501).send();
                    }else{
                        if(result) {
                            console.log(user)
                            res.json({
                                type: true,
                                data: {token: user.token}
                            });

                            /*                            var token = user.token;
                                                        delete user["hashed_password"];
                                                        delete user["token"];
                                                        delete user["__v"];
                                                        delete user["_id"];

                            */                       }else{

                            res.status(401).json({
                                type: false,
                                data: "Invalid Password"
                            })
                        }
                    }
                });
            } else {
                res.status(401).json({
                    type: false,
                    data: "User doesn't exist"
                });
            }
        }
    });
};

exports.createUser = function (req, res) {
    User.findOne({email: req.body.email}, function (err, user) {
        if (err) {
            console.log("Error");
            res.status(501).json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                res.status(409).json({
                    type: false,
                    data: "User already exists!"
                });
            } else {
                var userModel = new User({
                    email: req.body.email,
                    name: 'Usman Khan',
                    m_id: 123,   /*"00001", mobile login for easier access */
                    m_pin: 1210 ,  /*"1234" mobile "password" pin  */
                    f_name: "firstName", /*"johnlouis",*/
                    l_name: "string", /*"griffin"*/
                    address_1: "string", /*"123 fake street", */
                    address_2: "string", /*"", */
                    city: "string",   /*"somewhere",*/
                    state: "string",  /* "illinois",*/
                    zip: "60234",/* */
                    role: 1, /* this will be defined in a different table the numer here will go to a specific permission set */
                    co_id: null /* the company they are associated with */
                });
                console.log("Password recvd while creating user:" + req.body.password);

                userModel.save(function (err, user1) {
                    if(err){
                        res.status(409).send({
                            type: false,
                            data:err
                        });
                    }else {
                        helper.hashPassword(req.body.password, function(hashed_password) {
                            user1.token = jwt.sign(req.body, "asdasdasdasdasd");
                            user1.hashed_password= hashed_password;
                            console.log("Hashed password as I am saving: " + hashed_password);
                            user1.save(function (err, user2) {
                                user2 = user2.toObject();
                                delete user2["hashed_password"];
                                delete user2["token"];
                                delete user2["__v"];
                                delete user2["_id"];
                                res.json({
                                    type: true,
                                    data: user2,
                                    token: user1.token
                                });
                            });
                        });
                    }
                })
            }
        }
    })
};

