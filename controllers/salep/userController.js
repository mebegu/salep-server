const User = require('./../../models/salep/User');
const utility = require('./../other/utility.js');
const bcrypt = require('bcrypt');
const config = require('./../../config.json');
const parseQueryOptions = utility.parseQueryOptions;
const isEmpty = utility.isEmpty;
const respond = utility.respond;
const respondQuery = utility.respondQuery;
const respondBadRequest = utility.respondBadRequest;


exports.apply = function (req, res, next) {
  console.log('User Application Received');
  console.log(req.body);
  let object = {
    username: req.body.username,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    photo: req.body.photo,
    message: req.body.message
  };
  let password = req.body.password;
  if (!object.username || !object.email || !password)
    return respondBadRequest(res);

  let rounds = parseInt(config.saltRounds);
  bcrypt.hash(password, rounds).then(function (hash) {
    object.hash = hash;
    console.log(object);
    const data = new User(object);
    data.save((err) => {
      return respondQuery(res, err, data._id, 'New User', 'Applied');
    });
  });

};

exports.get = function (req, res, next) {
  console.log('Get-User request received');
  query = {
    _id: req.params.uid
  };

  if (!query._id)
    return respondBadRequest(res);

  User.findById(query, {
    hash: 0
  }, function (err, data) {
    return respondQuery(res, err, data, 'User', 'Found');
  });
};


exports.list = function (req, res, next) {
  console.log("List-User request received");
  let options = parseQueryOptions(req);

  if (options.skip < 0 || options.limit > 30)
    return respondBadRequest(res);

  User.find(req.query, {
    _id: 1,
    username: 1,
    name: 1,
    surname: 1
  }, options, function (err, data) {
    return respondQuery(res, err, data, 'Users', 'Found');
  });
}

exports.activate = function (req, res, next) {
  console.log("Update Activation Request Recevied");
  query = {
    _id: req.body._id
  };
  upt = {
    activated: req.body.activated
  };

  if (!query._id || !upt.activated)
    return respondBadRequest(res);

  User.findByIdAndUpdate(query, upt, {
      new: true
    },
    function (err, data) {
      return respondQuery(res, err, data._id, 'User', 'Activation');
    });
};

exports.edit = function (req, res, next) {
  console.log("Edit User Request Recevied");
  let query = {
    _id: req.body._id
  };
  let upt = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    photo: req.body.photo,
    message: req.body.message
  };

  if (!query._id || !upt.email || upt.isEmpty())
    return respondBadRequest(res);

  User.findByIdAndUpdate(query, upt, {
      new: true
    },
    function (err, data) {
      return respondQuery(res, err, data._id, 'Question', 'Marked');
    });
};