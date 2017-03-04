const User = require('./../../models/salep/User');
const utility = require('./../other/utility.js');
const jwt = require('express-jwt');

exports.apply = function(req, res, next) {
  console.log('User Application Received');

  if(!req.body.username || !req.body.email
    || !req.body.password) {
      return utility.repond(res, 400, false, 'Bad Request', null, null);
      /*
        console.log('success: false, detail: Bad Request');
        return res.status(400)
                  .send({'success': false, 'detail': 'Bad Request', 'data': null});
      */
  }

  const data = new User(req.body);
  data.setPassword(req.body.password);
  data.save((err) => {
    let detail = '';
    let success = false;
    let status = 200;
    if(err) {
      detail = 'Internal DB error';
      status = 500;
    }else{
      detail = 'New User Applied';
      status = 200;
      success = true;
    }
    return utility.repond(res, status, success, detail, data, err);
    /*
    console.log('success: '+success+', detail: '+detail);
    if(err)console.log(err);
    return res.status(status)
              .send({'success':success, 'detail': detail, 'data': data});
    */
  });
};

exports.login = function(req, res, next) {
  console.log('Login Request Received');

  User.findOne({username: req.body.username}).exec((err, data) => {
    let detail = '';
    let success = false;
    let status = 200;
    if(err) {
      detail = 'Internal DB error';
      status = 500;
    }if(!data || !data.validPassword(req.body.password)){
      detail = 'Login Failed';
      status = 401;
    }else{
      detail = 'Login Successfull';
      status = 200;
      success = true;
      data = data.generateJwt();
    }
    return utility.repond(res, status, success, detail, data, err);
    /*
    console.log('success: '+success+', detail: '+detail);
    if(err)console.log(err);
    return res.status(status)
              .send({'success':success, 'detail': detail, 'data': data});
    */
  });
};


exports.auth = jwt({
  secret: process.env.MY_TOKEN || 'MY_TOKEN',
  userProperty: 'user',
});
