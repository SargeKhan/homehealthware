
/*!
 * Module dependencies.
 */
var config = require('../../config/config.js');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Company = mongoose.model('Company');

exports.index = function (req, res) {
  res.render('home/index', {
    title: 'Node Express Mongoose Boilerplate'
  });
};

exports.createUser = function (req, res) {

  var arvind = new User({
    name: 'Usman Khan',
    email: "usmann@gmail.com",
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
    co_id: null, /* the company they are associated with */
    password: "kashifLatif",
    salt: ""
  });

  arvind.save(function (err, data) {
    if (err){
      res.render('home/index', {
        title: 'User error' + err
      })
    } else {
      console.log('Saved ', data );
      res.render('home/index', {
        title: 'User saved'
      })
    }
  });
};
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
