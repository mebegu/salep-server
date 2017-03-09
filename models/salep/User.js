const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const config = require('./../../config.json');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  username:  {type: String , required: true, unique: true},
  name:      {type: String , required: false},
  surname:   {type: String , required: false},
  email:     {type: String , required: true, unique: true},
  roles:     {type: [String],required: true, default: []},
  admin:     {type: Boolean, required: true, default: false},
  activated: {type: Boolean, required: true, default: false},
  date:      {type: Date   , default: Date.now},
  photo:     {type: String},
  hash:      {type: String},
  message:   {type: String}
});


UserSchema.methods.setPassword = function(password) {
  bcrypt.hash(password, config.saltRounds, function(err, hash) {
    this.hash = hash;
  });
};

UserSchema.methods.validPassword = function(password) {
  bcrypt.compare(password, this.hash, function(err, res) {
    return res;
  });
};

UserSchema.methods.generateJwt = function() {
  return jsonwebtoken.sign({
    _id:      this._id,
    email:    this.email,
    username: this.username,
    activated:this.activated,
    admin:    this.admin,
    roles:    this.roles
  }, (process.env.MY_TOKEN || config.JWTSecret), { expiresInMinutes: config.JWTExpiration });
};


module.exports = mongoose.model('User', UserSchema);
