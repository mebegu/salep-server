const User = require('./../../models/salep/User');
const Role = require('./../../models/salep/Role');
const utility = require('./../other/utility.js');
const respond = utility.respond;


exports.canAccess = function (req, res, next) {
  let path = req.path;
  let roles = req.user.roles;
  console.log(path);
  
  let query = {_id: req.user._id};
  let select = {
    _id: 1,
    roles: 1,
    activated: 1
  };
  User.findOne(query, select, function (err, data) {
    let detail = '';
    let success = false;
    let status = 200;
    if (err) {
      detail = 'Internal DB error';
      status = 500;
    } else if (!data) {
      detail = 'User Not Found';
      status = 404;
    } else if (data.access.admin) {
      return next();
    } else if (!doc.activated) {
      detail = 'User is not activated';
      status = 401;
    } else {
      if (control(roles, path, doc)) {
        return next();
      } else {
        detail = 'Unauthorized';
        status = 401;
      }
    }

    return respond(res, status, success, detail, data, err);
  });
};

function control(roles, path, doc) {
  Role.find({accesible: path}).exec(function(err, data){
    if (err) {
      return false;
    } else if (!data) {
      return false;
    } else {
      data.forEach(function(label){
        if(roles.indexOf(label) != -1)
          return true;
      });
      return false;
    }
  })
}