const User = require('./../../models/salep/User');
const utility = require('./../other/utility.js');
const respond = utility.respond;

exports.canAccess = function (req, res, next) {
  let path = req.path;
  console.log(path);
  
  let query = {_id: req.user._id};
  let select = {
    canAccess: 1,
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
      if (control(path, doc)) {
        return next();
      } else {
        detail = 'Unauthorized';
        status = 401;
      }
    }

    return repond(res, status, success, detail, data, err);
  });
};

function control(path, doc) {
  switch (path) {
    case '/question/submit':
      if (doc.access.question.submit)
        return true;
      break;
    case '/question/mark':
      if (doc.access.question.mark)
        return true;
      break;
    default:
      return false;
  }
}