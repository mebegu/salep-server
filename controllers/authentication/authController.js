const User = require('./../../models/salep/User');
const jwt = require('express-jwt');

exports.apply = function(req,res,next){
  console.log("User Application Received");
  if(!req.body.name || !req.body.surname || !req.body.email
    || !req.body.password || !req.body.applicationMessage){
      console.log("success: false, detail: Bad Request");
      return res.status(400).send({"success": false, "detail": "Bad Request", "data": null});
  }

  const user = new User(req.body);
  user.setPassword(req.body.password);
  user.save(err => {
    var detail = "";
    var success = false;
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
    var success = false;
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
      data = data.generateJwt();
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
