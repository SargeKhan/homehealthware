/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var userPlugin = require('mongoose-user');
var Schema = mongoose.Schema;
var crypto = require('crypto');
// npm install git://github.com/RGBboy/mongoose-validate.git
var validate = require('mongoose-validate')

/**
 * User schema
 */

var UserSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, unique: true, null: false, validate: [validate.email, 'invalid email address'] },
  m_id: {type: Number, null: false },   /*"00001", mobile login for easier access */
  m_pin: {type: Number, null: false } ,  /*"1234" mobile "password" pin  */
  f_name: { type: String, null: false}, /*"johnlouis",*/
  l_name: { type: String, null: false}, /*"griffin"*/
  address_1: { type: String, null: false}, /*"123 fake street", */
  address_2: { type: String, default: ''}, /*"", */
  city: { type: String, null: false},   /*"somewhere",*/
  state: { type: String, null: false},  /* "illinois",*/
  zip: {type: Number, null: false },    /*"60234",*/
  role: {type: Number, null: false}, /* this will be defined in a different table the numer here will go to a specific permission set */
  co_id: {type: Schema.Types.ObjectId, null:true}, /* the company they are associated with */
  token: {type:String, null: false, select: true},
  hashed_password: {type: Schema.Types.Mixed, null:false, trim:false, select: false},
  resetPasswordToken: {type:String, null: false, select: true},
  resetTokenExpires: {type:Date, select: true}
});

/**
 * hook a pre save method to hash the password
 */

/**
 * user plugin
 */

UserSchema.plugin(userPlugin, {});

/**
 * methods
 */

UserSchema.method({

});


/**
 * Statics
 */

UserSchema.static({

});

/**
 * Register
 */

mongoose.model('User', UserSchema);
