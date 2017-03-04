const User = require('./../../models/salep/User');
const utility = require('./../other/utility.js');

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
    return utility.repond(res, status, success, detail, data, err);
    /*console.log("success: "+success+", detail: "+detail);
    if(err)console.log(err);
    return res.status(status).send({"success":success, "detail": detail, "data": data});*/

  });
};

exports.list = function(req,res,next){
    console.log("List-Users request received");
    var options = {
      skip:0, // Starting Row
      limit:10, // Ending Row
      sort:{
        date: -1 //Sort by Date Added DESC
      }}
    var query = {}
    if(req.query.start)
      options.skip = req.query.start;

    if(req.query.end)
      options.limit = req.query.end;

    if((options.limit-options.skip)<0 || (options.limit-options.skip)>30){
      return utility.repond(res, 400, false, "Bad Request", null, null);
      //console.log("success: false, detail: Bad Request");
      //return res.status(400).send({"success": false, "detail": "Bad Request", "data": null});
    }
    User.find(req.query, {hash: 0, salt: 0}, options function (err, data) {
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
      return utility.repond(res, status, success, detail, data, err);
      /*console.log("success: "+success+", detail: "+detail);
      if(err)console.log(err);
      return res.status(status).send({"success":success, "detail": detail, "data": data});*/

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
    return utility.repond(res, status, success, detail, data, err);
    /*console.log("success: "+success+", detail: "+detail);
    if(err)console.log(err);
    return res.status(status).send({"success":success, "detail": detail, "data": data});*/
  });

};
