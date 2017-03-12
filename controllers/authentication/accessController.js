const User = require('./../../models/salep/User');
const utility = require('./../other/utility.js');
const respond = utility.respond;

exports.isAdmin = function (req, res, next) {
  let admin = req.user.admin;
  if (!admin) {
    detail = 'Forbidden';
    status = 403;
    return respond(res, status, success, detail, data, err);
  } else {
    return next();
  }
};
