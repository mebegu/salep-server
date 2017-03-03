const User = require('./../../models/salep/User');


exports.canAccess = function(req,res,next){
  var path = req.path;
  console.log(path);
  query = {_id: req.user._id};
  User.findOne(query, {canAccess: 1, activated: 1}, function (err, data) {
    var detail = "";
    var success = false;
    var status = 200;
    if(err){
      detail = "Internal DB error";
      status = 500;
    }else if(!data){
      detail = "User Not Found";
      status = 404;
    }else if(data.access.admin){
      return next();
    }else if(!doc.activated){
      detail = "User is not activated";
      status = 401;
    }else{
      if(control(path, doc)){
        return next();
      }else{
        detail = "Unauthorized";
        status = 401;
      }
    }

    console.log("success: "+success+", detail: "+detail);
    console.log(err);
    return res.status(status).send({"success":success, "detail": detail, "data": data});
  });
}

function control (path, doc) {
  switch (path) {
    case "/question/submit":
      if(doc.access.question.submit)
        return true;
      break;
    case "/question/mark":
      if(doc.access.question.mark)
        return true;
      break;
    default:
      return false;
  }
}
