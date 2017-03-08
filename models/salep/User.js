const mongoose = require('mongoose');
const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  username:  {type: String , required: true, unique: true},
  name:      {type: String , required: false},
  surname:   {type: String , required: false},
  email:     {type: String , required: true, unique: true},
  photo:     {type: String},
  roles:     {type: [String]},
  activated: {type: Boolean, default: false},
  date:      {type: Date   , default: Date.now},
  hash:      {type: String},
  salt:      {type: String},
  message:   {type: String},
});


UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1')
                    .toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1')
                     .toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJwt = function() {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 15);
  return jsonwebtoken.sign({
    _id:      this._id,
    email:    this.email,
    username: this.username,
    roles:    this.roles,
    expire:   parseInt(expiry.getTime() / 1000)
  }, process.env.MY_TOKEN || 'MY_TOKEN');
};


module.exports = mongoose.model('User', UserSchema);
