const mongoose = require('mongoose'),
      crypto = require('crypto'),
      jsonwebtoken = require('jsonwebtoken'),
      Schema = mongoose.Schema;


const qrQuestionAcess = new Schema({
  submit: {type: Boolean},
  mark: {type: Boolean}
});

const qrAcess = new Schema({
  question: {type: qrQuestionAcess}
})

const access = new Schema({
  admin: {type: Boolean},
  qr: {type: qrAcess}
})

const UserSchema = new Schema({
        name: {type: String, required: true},
        surname: {type: String, required: false},
        email: {type: String, required:true, unique: true},
        photo: {type: mongoose.SchemaTypes.ObjectId},
        access: {type:access, required: true},
        activated: {type: Boolean, required: true, default:false},
        date: { type: Date, default: Date.now },
        hash: {type: String, required: true},
        salt: {type: String, required: true},
        applicationMessage: {type: String, required: false}
});


UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password){
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJwt = function () {
  const expiry = new Date()
  expiry.setDate(expiry.getDate() + 15)
  return jsonwebtoken.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    surname: this.surname,
    expire: parseInt(expiry.getTime() / 1000)
  }, process.env.MY_TOKEN || 'MY_TOKEN')
};


module.exports = mongoose.model('User',UserSchema);
