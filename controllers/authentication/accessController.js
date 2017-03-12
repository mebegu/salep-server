const User = require('./../../models/salep/User');
const utility = require('./../other/utility.js');
const respond = utility.respond;


exports.canAccess = function (req, res, next) {
  let path = req.path;
  let roles = req.user.roles;
  let admin = req.user.admin;
  let activated = req.user.activated;
  console.log(path);
  
  let detail = '';
  let success = false;
  let status = 200;
  if (admin) {
    return next();
  } else if (!activated) {
    detail = 'User is not activated';
    status = 401;
  } else {
    if (adminPath(roles, path)) {
       return next();
  } else {
    detail = 'Unauthorized';
    status = 401;
  }
}

  return respond(res, status, success, detail, data, err);
};

function adminPath(path) {
  if(path === "/qr/question/mark"){

  }
}