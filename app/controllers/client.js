/**
 * Created by usman on 3/5/16.
 */


var mongoose = require('mongoose');
var Client = mongoose.model('Client');

exports.getClient = function(req, res){
    Client.findById(req.params.id, function(err, client){
        if(err) { res.status(400).send({err: err })}
        else{
            res.send(client);
        }
    });
};

exports.updateClient = function(req, res){
    var id= req.params.id;
    var updatePairs= req.body;
    Client.update({ _id: id}, {$set: updatePairs}, {}, function(err, result){
        if(err) { res.status(400).send({ type: false, err: err}) }
        else{
            res.send({type: true, result: result})
        }
    });
};

exports.removeClient = function(req, res){
    var id= req.params.id;
    Client.remove({ _id: id}, function(err, result){
        if(err) { res.status(400).send({type: false,err: err}) }
        else{
            res.send({type: true, result:result})
        }
    });
};

exports.createClient = function(req, res){
    var clientJson = req.body;
    var client = new Client(clientJson);
    client.save(function(err, result){
        if(err) { res.status(400).send({type: false,err: err}) }
        else{
            res.send({type: true, result:result})
        }
    });
};
