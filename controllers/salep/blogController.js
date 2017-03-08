const Blog = require('./../../models/salep/Blog');
const utility = require('./../other/utility.js');
const isEmpty = utility.isEmpty;
const respond = utility.respond;
const respondQuery = utility.respondQuery;
const respondBadRequest = utility.respondBadRequest;
const parseQueryOptions = utility.parseQueryOptions;

exports.create = function (req, res, next) {
  console.log("Create Blog Request Received");

  let object = {
    title:    req.body.title,
    content:  req.body.content,
    image:    req.body.image,
    tags:     req.body.tags,
    author:   req.user._id
  };

  if (isEmpty(object.title)|| isEmpty(object.content) )
    return respondBadRequest(res);

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
  
  Blog.findById(query).populate("author", "username").exec( function (err, data) {
    return respondQuery(res, err, data, 'Blog', 'Found');
  });
};

exports.list = function (req, res, next) {
  console.log("List-Blogs request received");
  let options = parseQueryOptions(req);

  if (options.skip < 0 || options.limit > 30)
    return respondBadRequest(res);

  Blog.find(req.query, {content:0}, options).populate("author", "username").exec( function (err, data) {
    return respondQuery(res, err, data, 'Blogs','Found');
  });
};

exports.edit = function (req, res, next) {
  console.log("Edit Blog Request Recevied");
  let query = {_id: req.body._id};
  let upt = {
    title:      req.body.title,
    content:    req.body.content,
    image:      req.body.image,
    tags:       req.body.tags,
    date:       Date.now,
    published:  req.body.published,
    author:     req.user._id
  };

  if (isEmpty(query._id)) 
    return respondBadRequest(res);
  
  Blog.findByIdAndUpdate(query, upt, {new: true}, 
  function (err, data) {
    return respondQuery(res, err, data, 'Blog', 'Edited');
  });
};

exports.remove = function (req, res, next) {
  console.log('Remove Blog request received');
  query = {_id: req.params.qid};

  if (isEmpty(query._id))
    return respondBadRequest(res);

  Blog.findByIdAndRemove(query, function (err, data) {
    return respondQuery(res, err, data, 'Blog', 'Removed');
  });
};


exports.publish = function (req, res, next) {
  console.log('Publish Blog Request Recevied');
  query = {_id: req.body._id};
  upt = {published: req.body.published};

  if (isEmpty(query._id) || isEmpty(upt.status))
    return respondBadRequest(res);

  Blog.findByIdAndUpdate(query, upt, {
      new: true
    },
    function (err, data) {
      return respondQuery(res, err, data, 'Blog', 'Published');
    });
};
