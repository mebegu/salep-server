const User = require('./../../models/salep/User');

exports.get = function(req,res,next){
  console.log("Get-User request received");

  query= { _id: req.params.uid};
  User.findOne(query, {hash: 0, salt: 0}, function (err, data) {
    var detail = "";
    var success = false;
    var status = 200;
    if(err){
      detail = "Internal DB error";
      status = 500;
    }else if(!data){
      detail = "User Not Found";
      status = 404;
    }else{
      detail = "User Found";
      status = 200;
      success = true;
    }

    console.log("success: "+success+", detail: "+detail);
    console.log(err);
    return res.status(status).send({"success":success, "detail": detail, "data": data});

  });
};

exports.list = function(req,res,next){
    console.log("List-Users request received");

    User.find({}, {hash: 0, salt: 0}, function (err, data) {
      var detail = "";
      var success = false;
      var status = 200;
      if(err){
        detail = "Internal DB error";
        status = 500;
      }else if(!data){
        detail = "Users Not Found";
        status = 404;
      }else{
        detail = "Users Found";
        status = 200;
        success = true;
      }

      console.log("success: "+success+", detail: "+detail);
      console.log(err);
      return res.status(status).send({"success":success, "detail": detail, "data": data});

    });
}

exports.updateAccess = function(req,res,next){
  console.log("Update Access Request Recevied");
  query = { _id: req.body._id};
  upt   = { activated: req.body.activated,
            access: req.body.access};

  User.findOneAndUpdate(query, upt, {new: true}, function (err, data) {
    var detail = "";
    var success = false;
    var status = 200;
    if(err){
      detail = "Internal DB error";
      status = 500;
    }else if(!data){
      detail = "User Not Found";
      status = 404;
    }else{
      detail = "Access Control Updated";
      status = 200;
      success = true;
    }

    console.log("success: "+success+", detail: "+detail);
    console.log(err);
    return res.status(status).send({"success":success, "detail": detail, "data": data});
  });

};
