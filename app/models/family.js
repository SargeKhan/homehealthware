/**
 * Created by usman on 3/9/16.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// npm install git://github.com/RGBboy/mongoose-validate.git
var validate = require('mongoose-validate');

var Family = new Schema({

    f_name: { type: String },
    l_name: { type: String },
    address_street: { type: String },
    address_street2: { type: String },
    address_city: { type: String },
    address_state: { type: String },
    relationship: { type: String },
    company: { type: String },
    department: { type: String },
    workphone: { type: String },
    homephone: { type: String },
    cellphone: { type: String },
    email: { type: String, unique: true, null: true, validate: [validate.email, 'invalid email address'] },
    notes: { type: String },
    patid: {type: Schema.Types.ObjectId, null:true},
    co_id: {type: Schema.Types.ObjectId, null:true} /* the company they are associated with */

});

mongoose.model('family', Family);
