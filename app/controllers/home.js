
/*!
 * Module dependencies.
 */
var config = require('../../config/config.js');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Company = mongoose.model('Company');
var helper = require('../helper_functions/password');
var jwt = require("jsonwebtoken");

exports.index = function (req, res) {
  res.render('home/index', {
    title: 'Node Express Mongoose Boilerplate'
  });
};
exports.login = function(req, res) {
    helper.hashPassword(req.body.password, function(hashedPassword){
        User.findOne({email: req.body.email, password: hashedPassword}, '+hashed_password',function(err, user) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                if (user) {
                    res.json({
                        type: true,
                        data: user,
                        token: user.token
                    });
                } else {
                    res.json({
                        type: false,
                        data: "Incorrect email/password"
                    });
                }
            }
        });
    });
};

exports.createUser = function (req, res) {

    console.log("In createUser");
    User.findOne({email: req.body.email}, function (err, user) {
        console.log("In User callback");
        if (err) {
            console.log("Error");
            res.status(501).json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                console.log("User found");
                res.status(409).json({
                    type: false,
                    data: "User already exists!"
                });
            } else {
                console.log("Creating new user");
                var userModel = new User({
                    email: req.body.email,
                    password : req.body.password,
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
                console.log("Email recvd:" + req.body.email);
                console.log("Password recvd:" + req.body.password);

                userModel.save(function (err, user1) {
                    if(err){
                        res.status(409).send({
                            type: false,
                            data:err
                        });
                    }else {
                        console.log("Before generating token");
                        user1.token = jwt.sign(req.body, "asdasdasdasdasd");
                        console.log("after generating token");

                        user1.save(function (err, user2) {
                            console.log("Before deleteing: \n"+  user2);
                            delete user2.hashed_password;
                            delete user2.token;
                            delete user2.v;
                            console.log("Before deleteing: \n"+ user2);
                            res.json({
                                type: true,
                                data: user2,
                                token: user1.token
                            });
                        });
                    }
                })
            }
        }
    });
}
/*

        var password = helper.hashPassword("kashifLatif", function(password){
        console.log("password: " + password);
        var arvind = new User({
            name: 'Usman Khan',
            email: "usmann@gmail.com",
            m_id: 123,   */
/*"00001", mobile login for easier access *//*

            m_pin: 1210 ,  */
/*"1234" mobile "password" pin  *//*

            f_name: "firstName", */
/*"johnlouis",*//*

            l_name: "string", */
/*"griffin"*//*

            address_1: "string", */
/*"123 fake street", *//*

            address_2: "string", */
/*"", *//*

            city: "string",   */
/*"somewhere",*//*

            state: "string",  */
/* "illinois",*//*

            zip: "60234",*/
/* *//*

            role: 1, */
/* this will be defined in a different table the numer here will go to a specific permission set *//*

            co_id: null, */
/* the company they are associated with *//*

            hashed_password:password
        });


        arvind.save(function (err, data) {
            if (err){
                res.render('home/index', {
                    title: 'User error: ' + err
                })
            } else {
                console.log('Saved ', data );
                res.render('home/index', {
                    title: 'User saved'
                })
            }
        });

    });
*/

exports.createCompany = function(req, res){
    var company = {
        display_name: "Among Friends Adult Day Care",
        legal_name: "Among Friends Adult Day Care, Inc.",
        tin: "123456789",
        npi: "1571234567",
        address_1: "13333 S. Cicero Ave.",
        address_2: "",
        address_city: "Crestwood",
        address_state: "Illinois",
        address_zip: "60445",
        phone1: "7083962345",
        phone2: "7087552345",
        owner: "Ralph Ditchie"
    };
    cmpany = new Company(company);
    cmpany.save(function(err,result){
        if(err){
            console.log(err);
            res.send(err)
        }else{
            console.log(result);
            res.send(result)
        }
    });
};

exports.authenticateView = function(req, res){
    res.send(req.user);
}
