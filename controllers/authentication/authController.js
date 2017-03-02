const User = require('./../../models/salep/User');
const jwt = require('express-jwt');

exports.apply = function(req,res,next){
  console.log("User Application Received");
  const user = new User(req.body);
  user.setPassword(req.body.password);

  user.save(err => {
    var detail = "";
    var succes = false;
    var status = 200;
    if(err){
      detail = "Internal DB error";
      status = 500;
    }else{
      detail = "New User Applied";
      status = 200;
      success = true;
    }

    console.log("success: "+success+", detail: "+detail);
    console.log(err);
    return res.status(status).send({"success":success, "detail": detail, "data": data});

  });
}

exports.login = function(req,res,next){
  console.log("Login Request Received");

  User.findOne({email: req.body.email}).exec((err, data) => {
    var detail = "";
    var succes = false;
    var status = 200;
    if(err){
      detail = "Internal DB error";
      status = 500;
    }if(!data || !data.validPassword(req.body.password)){
      detail = "Login Failed";
      status = 401;
    }else{
      detail = "Login Successfull";
      status = 200;
      success = true;
    }

    console.log("success: "+success+", detail: "+detail);
    console.log(err);
    return res.status(status).send({"success":success, "detail": detail, "data": data});

  });
};


exports.auth = jwt({
  secret: process.env.MY_TOKEN || 'MY_TOKEN',
  userProperty: 'user'
});
