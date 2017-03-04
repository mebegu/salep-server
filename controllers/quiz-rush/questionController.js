const Question = require('./../../models/quiz-rush/Question');
const utility = require('./../other/utility.js');
const isEmpty = utility.isEmpty;
const respond = utility.respond;
const respondQuery = utility.respondQuery;
const repondBadRequest = utility.repondBadRequest;

exports.submit = function (req, res, next) {
  console.log('Question Submission Received');
  let correct = parseInt(req.body.correctAnswer);
  let object = {
    question: req.body.question,
    options: req.body.options,
    correctAnswer: correct,
    tags: req.body.tags,
    author: req.user._id,
    status: 'pending'
  };

  if (isEmpty(question) || isEmpty(options) ||
    object.options.length != 4 || object.correctAnswer < 0 || object.correctAnswer > 3)
    return utility.repondBadRequest(res);

  const data = new Question(object);
  data.save((err) => {
    return respondQuery(res, err, data, 'Question', 'Submitted');
  });
};

exports.get = function (req, res, next) {
  console.log('Get-Question request received');
  query = {_id: req.params.qid};

  if (isEmpty(query.id))
    return repondBadRequest(res);

  Question.findById(query, function (err, data) {
    return repondQuery(res, err, data, 'Question', 'Found');
  });
};

exports.list = function (req, res, next) {
  console.log('List-Questions request received');
  let options = utility.parseQueryOptions(req);

  if (options.skip < 0 || options.limit > 30)
    return repondBadRequest(res);

  Question.find(req.query, options, function (err, data) {
    return repondQuery(res, err, data, 'Questions', 'Found');
  });
};

exports.mark = function (req, res, next) {
  console.log('Mark Question Request Recevied');
  query = {_id: req.body._id};
  upt = {status: req.body.status};

  if (isEmpty(query._id) || isEmpty(upt.status))
    return repondBadRequest(res);

  Question.findByIdAndUpdate(query, upt, {
      new: true
    },
    function (err, data) {
      return respondQuery(res, err, data, 'Question', 'Marked');
    });
};

exports.edit = function (req, res, next) {
  console.log("Edit Question Request Recevied");
  let query = {_id: req.body._id};
  let upt = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    photo: req.body.photo,
    message: req.body.message
  };

  if (isEmpty(query._id)|| isEmpty(email)) 
    return utility.repondBadRequest(res);
  
  Question.findByIdAndUpdate(query, upt, {new: true}, 
  function (err, data) {
    return utility.respondQuery(res, err, data, 'Question', 'Edited');
  });
};

exports.remove = function (req, res, next) {
  console.log('Remove Question request received');
  query = {_id: req.params.qid};

  if (isEmpty(query.id))
    return repondBadRequest(res);

  Question.findByIdAndRemove(query, function (err, data) {
    return repondQuery(res, err, data, 'Question', 'Remove');
  });
};