const User = require('./../../models/salep/User');
const utility = require('./../other/utility.js');

exports.apply = function (req, res, next) {
  console.log('User Application Received');

  let object = {
    username: req.body.username ,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    photo: req.body.photo,
    message: req.body.message
  };
  let password = req.body.password;
  if (!object.username || !object.email || !password)
    return utility.repondBadRequest(res);

  const data = new User(object);
  data.setPassword(req.body.password);
  data.save((err) => {
    return utility.respondQuery(res, err, data, 'New User', 'Applied');
  });
};

exports.get = function (req, res, next) {
  console.log('Get-User request received');
  query = {_id: req.params.qid};

  if (!query._id)
    return utility.repondBadRequest(res);

  User.findById(query, function (err, data) {
    return utility.repondQuery(res, err, data, 'User', 'Found');
  });
};


exports.list = function (req, res, next) {
  console.log("List-User request received");
  let options = utility.parseQueryOptions(req);

  if (options.skip < 0 || options.limit > 30)
    return utility.repondBadRequest(res);

  User.find(req.query, options, function (err, data) {
    return utility.repondQuery(res, err, data, 'Users','Found');
  });
}

exports.updateAccess = function (req, res, next) {
  console.log("Update Access Request Recevied");
  query = {_id: req.body._id};
  upt = {
    activated:  req.body.activated,
    access:     req.body.access
  };

  if (!query._id || !upt.activated || !upt.access) 
    return utility.repondBadRequest(res);
  
  User.findByIdAndUpdate(query, upt, {new: true}, 
  function (err, data) {
    return utility.respondQuery(res, err, data, 'Question', 'Marked');
  });
};

exports.edit = function (req, res, next) {
  console.log("Edit User Request Recevied");
  let query = {_id: req.body._id};
  let upt = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    photo: req.body.photo,
    message: req.body.message
  };

  if (!query._id || !upt.email || upt.isEmpty()) 
    return utility.repondBadRequest(res);
  
  User.findByIdAndUpdate(query, upt, {new: true}, 
  function (err, data) {
    return utility.respondQuery(res, err, data, 'Question', 'Marked');
  });
};
