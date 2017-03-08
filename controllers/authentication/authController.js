const User = require('./../../models/salep/User');
const utility = require('./../other/utility.js');
const jwt = require('express-jwt');
const isEmpty = utility.isEmpty;
const respond = utility.respond;

exports.login = function (req, res, next) {
  console.log('Login Request Received');
  let username = req.body.username;
  let password = req.body.password;

  if (isEmpty(username) || isEmpty(password))
    return utility.respondBadRequest(res);

  User.findOne({'username': username}).exec((err, user) => {
    let detail = '';
    let success = false;
    let status = 200;
    let data = null;
    if (err) {
      detail = 'Internal DB error';
      status = 500;
    }else if (!user || !user.validPassword(password)) {
      detail = 'Login Failed';
      status = 401;
    } else if(!user.activated){
      detail = 'User Not Activated';
      status = 401;
    } else {
      detail = 'Login Successfull';
      status = 200;
      success = true;
      data = user.generateJwt();
    }
    return respond(res, status, success, detail, data, err);
  });
};

exports.auth = jwt({
  secret: process.env.MY_TOKEN || 'MY_TOKEN',
  userProperty: 'user'
});