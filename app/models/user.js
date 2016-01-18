
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var userPlugin = require('mongoose-user');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
/**
 * User schema
 */

var UserSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, unique: true, null: false },
  m_id: {type: Number, null: false },   /*"00001", mobile login for easier access */
  m_pin: {type: Number, null: false } ,  /*"1234" mobile "password" pin  */
  f_name: { type: String, null: false}, /*"johnlouis",*/
  l_name: { type: String, null: false}, /*"griffin"*/
  address_1: { type: String, null: false}, /*"123 fake street", */
  address_2: { type: String, default: ''}, /*"", */
  city: { type: String, null: false},   /*"somewhere",*/
  state: { type: String, null: false},  /* "illinois",*/
  zip: {type: Number, null: false },    /*"60234",*/
  role: {type: Number, null:false}, /* this will be defined in a different table the numer here will go to a specific permission set */
  co_id: {type: Schema.Types.ObjectId, null:true}, /* the company they are associated with */
  hashed_password: { type: String, null:false},
  salt: { type: String, default: '' }
});

/**
 * hook a pre save method to hash the password
 */

UserSchema.pre('save', function(next) {
  console.log("password: " + this.password );
  if (!this.isModified('password')) return next()
  if (this.password && this.password.length > 6) {
    var password = this.password;
    console.log("User password is okay");
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        var err = new Error("Error hashing password.");
        next(err);
      } else {
        this.hashed_password = hash;
        console.log(hash);
        bcrypt.compare(password, this.hashed_password, function (err, result) {
          console.log("Checking hash and password. Result is: " + result);
          console.log("Checking hash and password. Error is: " + err);
          next();
        });
      }
    });
  }
});

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
