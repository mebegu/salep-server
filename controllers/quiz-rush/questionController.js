const Question = require('./../../models/quiz-rush/Question');
const utility = require('./../other/utility.js');

exports.submit = function(req, res, next) {
    console.log('Question Submission Received');
    let object = {
      question: req.body.question,
      options: req.body.options,
      correctAnswer: req.body.correctAnswer,
      tags: req.body.tags,
      author: req.user._id,
      status: 'pending',
    };
    const data = new Question(object);
     data.save((err) => {
      let detail = '';
      let success = false;
      let status = 200;
      if(err) {
        detail = 'Internal DB error';
        status = 500;
      }else{
        detail = 'Question Submitted';
        status = 200;
        success = true;
      }

      return utility.repond(res, status, success, detail, data, err);
      /*
      console.log('success: '+success+', detail: '+detail);
      if(err)console.log(err);
      return res.status(status)
                .send({'success':success, 'detail': detail, 'data': data});
      */
    });
};

exports.get = function(req, res, next) {
  console.log('Get-Question request received');

  query = {_id: req.params.qid};
  Question.findOne(query, function(err, data) {
    let detail = '';
    let success = false;
    let status = 200;
    if(err) {
      detail = 'Internal DB error';
      status = 500;
    }else if(!data) {
      detail = 'Question Not Found';
      status = 404;
    }else{
      detail = 'Question Found';
      status = 200;
      success = true;
    }

    return utility.repond(res, status, success, detail, data, err);
    /*
    console.log('success: '+success+', detail: '+detail);
    if(err)console.log(err);
    return res.status(status)
              .send({'success':success, 'detail': detail, 'data': data});
    */
  });
};

exports.list = function(req, res, next) {
  console.log('List-Questions request received');
  let options = {
    skip: 0, // Starting Row
    limit: 10, // Ending Row
    sort: {
      date: -1, // Sort by Date Added DESC
    }};
  if(req.query.start)
    options.skip = req.query.start;

  if(req.query.end)
    options.limit = req.query.end;

  if((options.limit-options.skip)<0 || (options.limit-options.skip)>30) {
    return utility.repond(res, 400, false, 'Bad Request', null, null);
    /*
    console.log('success: false, detail: Bad Request');
    return res.status(400)
              .send({'success': false, 'detail': 'Bad Request', 'data': null});
    */
  }

  Question.find(req.query, options, function(err, data) {
    let detail = '';
    let success = false;
    let status = 200;
    if(err) {
      detail = 'Internal DB error';
      status = 500;
    }else if(!data) {
      detail = 'Questions Not Found';
      status = 404;
    }else{
      detail = 'Questions Found';
      status = 200;
      success = true;
    }

    return utility.repond(res, status, success, detail, data, err);
    /* console.log('success: '+success+', detail: '+detail);
    if(err)console.log(err);
    return res.status(status)
              .send({'success':success, 'detail': detail, 'data': data});
    */
  });
};

exports.mark = function(req, res, next) {
  console.log('Mark Question Request Recevied');
  query = {_id: req.body._id};
  upt = {status: req.body.status};

  Question.findOneAndUpdate(query, upt, {new: true}, function(err, data) {
    let detail = '';
    let success = false;
    let status = 200;
    if(err) {
      detail = 'Internal DB error';
      status = 500;
    }else if(!data) {
      detail = 'Question Not Found';
      status = 404;
    }else{
      detail = 'Question Marked';
      status = 200;
      success = true;
    }

    return utility.repond(res, status, success, detail, data, err);
    /*
    console.log('success: '+success+', detail: '+detail);
    if(err)console.log(err);
    return res.status(status)
              .send({'success':success, 'detail': detail, 'data': data});
    */
  });
};
