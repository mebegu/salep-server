const Blog = require('./../../models/salep/Blog');
const utility = require('./../other/utility.js');
const isEmpty = utility.isEmpty;
const respond = utility.respond;
const respondQuery = utility.respondQuery;
const repondBadRequest = utility.repondBadRequest;

exports.create = function (req, res, next) {
  console.log("Create Blog Request Received");

  let object = {
    title:    req.body.title,
    content:  req.body.content,
    image:    req.body.image,
    tags:     req.body.tags,
    author:   req.user._id
  };

  if (isEmpty(object.title)|| isEmpty(content) )
    return repondBadRequest(res);

  const data = new Blog(object);
  data.save((err) => {
    return respondQuery(res, err, data, 'Blog', 'Submitted');
  });
};

exports.get = function (req, res, next) {
  console.log("Get-Blog request received");
  let query = { _id: req.params.bid };

  if(isEmpty(query._id)) 
    return respondBadRequest(res);
  
  Blog.findById(query, function (err, data) {
    return repondQuery(res, err, data, 'Blog', 'Found');
  });
};

exports.list = function (req, res, next) {
  console.log("List-Blogs request received");
  let options = utility.parseQueryOptions(req);

  if (options.skip < 0 || options.limit > 30)
    return utility.repondBadRequest(res);

  Blog.find(req.query, options, function (err, data) {
    return repondQuery(res, err, data, 'Blogs','Found');
  });
};

exports.edit = function (req, res, next) {
  console.log("Edit Blog Request Recevied");
  let query = {_id: req.body._id};
  let object = {
    title:      req.body.title,
    content:    req.body.content,
    image:      req.body.image,
    tags:       req.body.tags,
    date:       Date.now,
    published:  req.body.published,
    author:     req.user._id
  };

  if (isEmpty(query._id)|| isEmpty(email)) 
    return repondBadRequest(res);
  
  Blog.findByIdAndUpdate(query, upt, {new: true}, 
  function (err, data) {
    return respondQuery(res, err, data, 'Blog', 'Blog');
  });
};

exports.remove = function (req, res, next) {
  console.log('Remove Blog request received');
  query = {_id: req.params.qid};

  if (isEmpty(query.id))
    return repondBadRequest(res);

  Blog.findByIdAndRemove(query, function (err, data) {
    return repondQuery(res, err, data, 'Question', 'Removed');
  });
};