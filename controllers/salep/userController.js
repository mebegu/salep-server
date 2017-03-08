const User = require('./../../models/salep/User');
const utility = require('./../other/utility.js');
const parseQueryOptions = utility.parseQueryOptions;
const isEmpty = utility.isEmpty;
const respond = utility.respond;
const respondQuery = utility.respondQuery;
const respondBadRequest = utility.respondBadRequest;


exports.apply = function (req, res, next) {
  console.log('User Application Received');
  console.log(req.body);
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
    return respondBadRequest(res);

  const data = new User(object);
  data.setPassword(req.body.password);
  data.save((err) => {
    return respondQuery(res, err, data._id, 'New User', 'Applied');
  });
};

exports.get = function (req, res, next) {
  console.log('Get-User request received');
  query = {_id: req.params.uid};

  if (!query._id)
    return respondBadRequest(res);

  User.findById(query,{hash:0, salt:0}, function (err, data) {
    return respondQuery(res, err, data, 'User', 'Found');
  });
};


exports.list = function (req, res, next) {
  console.log("List-User request received");
  let options = parseQueryOptions(req);

  if (options.skip < 0 || options.limit > 30)
    return respondBadRequest(res);

  User.find(req.query, {_id:1, username:1, name:1, surname:1}, options, function (err, data) {
    return respondQuery(res, err, data, 'Users','Found');
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
    return respondBadRequest(res);
  
  User.findByIdAndUpdate(query, upt, {new: true}, 
  function (err, data) {
    return respondQuery(res, err, data, 'Question', 'Marked');
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
    return respondBadRequest(res);
  
  User.findByIdAndUpdate(query, upt, {new: true}, 
  function (err, data) {
    return respondQuery(res, err, data, 'Question', 'Marked');
  });
};
