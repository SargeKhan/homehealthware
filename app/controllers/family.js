var mongoose = require('mongoose');
var Family = mongoose.model('family');

exports.createFamily = function(req, res){
    var familyJson = req.body.family;
    var family = new Family(familyJson);
    family.save(function(err, result){
        if(err) {
            res.status(501).json({type: false, err: err});
        } else {
            res.status(200).json({type: true, result: "Family member created"});
        }
    })
};

exports.updateFamily = function(req, res) {
    var id = req.params.id;
    var updatePairs = req.body;
    Family.update({_id: id}, {$set: updatePairs}, {}, function (err, result) {
        if (err) {
            res.status(400).send({type: false, err: err})
        }
        else {
            res.send({type: true, result: result})
        }
    });
};
exports.removeFamily = function(req, res){
    var id= req.params.id;
    Family.remove({ _id: id}, function(err, result){
        if(err) { res.status(400).send({type: false,err: err}) }
        else{
            res.send({type: true, result:result})
        }
    });
};

exports.getFamily = function(req, res){
    var id= req.params.id;
    Family.getFamily({ _id: id}, function(err, result){
        if(err) { res.status(400).send({type: false,err: err}) }
        else{
            res.send({type: true, result:result})
        }
    });
};
