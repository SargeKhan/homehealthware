/**
 *
 * Created by usman on 2/2/16.
 */


var mongoose = require('mongoose');
var Company = mongoose.model('Company');

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

exports.getCompany = function(req, res){
    var id = req.params.id;
    Company.findOne({id: id}, function(err, result){
        if(err) {
            res.status(501).json({
            type: false,
            data: err });
        }else {
            res.status(200).json({
                type: true,
                data: result
            });
        }
    });
};
