const Role = require('./../../models/salep/Role');
const utility = require('./../other/utility.js');
const respond = utility.respond;
const respondBadRequest = utility.respondBadRequest;

exports.createRole = function(req, res, next){
  console.log("Create Blog Request Received");

  let object = {
    label:    req.body.label,
    accessible:  req.body.accessible
  };

  if (isEmpty(object.label)|| isEmpty(object.accessible) )
    return respondBadRequest(res);

  const data = new Role(object);
  data.save((err) => {
    return respondQuery(res, err, data, 'Role', 'Created');
  });
};

exports.get = function (req, res, next) {
  console.log("Get-Role request received");
  let query = { _id: req.params.rid };

  if(isEmpty(query._id)) 
    return respondBadRequest(res);
  
  Role.findById(query, function (err, data) {
    return respondQuery(res, err, data, 'Role', 'Found');
  });
}

exports.list = function (req, res, next) {
  console.log("List-Roles request received");
  let options = parseQueryOptions(req);

  if (options.skip < 0 || options.limit > 30)
    return respondBadRequest(res);

  Role.find(req.query, {accessible:0}, options, function (err, data) {
    return respondQuery(res, err, data, 'Roles','Found');
  });
};

exports.edit = function (req, res, next) {
  console.log("Edit Blog Request Recevied");
  let query = {_id: req.body._id};
  let upt = {
    label:    req.body.label,
    accessible:  req.body.accessible
  };

  if (isEmpty(query._id)) 
    return respondBadRequest(res);
  
  Role.findByIdAndUpdate(query, upt, {new: true}, 
  function (err, data) {
    return respondQuery(res, err, data, 'Role', 'Edited');
  });
};

exports.remove = function (req, res, next) {
  console.log('Remove Role request received');
  query = {_id: req.params.qid};

  if (isEmpty(query.id))
    return respondBadRequest(res);

  Role.findByIdAndRemove(query, function (err, data) {
    return respondQuery(res, err, data, 'Role', 'Removed');
  });
};

exports.setUser = function (req, res, next){
  console.log('Set Role for User Request Recevied');
  query = {_id: req.body._id};
  upt = {roles: req.body.role};

  if (isEmpty(query._id) || isEmpty(upt.status))
    return respondBadRequest(res);

  User.findByIdAndUpdate(query, { $push: upt }, {salt: 0, hash:0}, {new: true}, function (err, data) {
      return respondQuery(res, err, data, 'Role', 'Setted');
    });
}

exports.removeUser = function (req, res, next){
  console.log('Remove Role from User Request Recevied');
  query = {_id: req.body._id};
  upt = {roles: req.body.role};

  if (isEmpty(query._id) || isEmpty(upt.status))
    return respondBadRequest(res);

  User.findByIdAndUpdate(query, { $pull: upt }, {salt: 0, hash:0}, {new: true}, function (err, data) {
      return respondQuery(res, err, data, 'Role', 'Removed');
    });
}