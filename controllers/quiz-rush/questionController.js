const Question = require('./../../models/quiz-rush/Question');

exports.submit = function(req,res,next){
    console.log("Question Submission Received");
    var object = {
      question: req.body.question,
      options: req.body.options,
      correctAnswer: req.body.correctAnswer,
      tags: req.body.tags,
      author: req.user._id,
      status: "unrated"
    };
    const data = new Question(object);
    question.save(err => {
      var detail = "";
      var success = false;
      var status = 200;
      if(err){
        detail = "Internal DB error";
        status = 500;
      }else{
        detail = "Question Submitted";
        status = 200;
        success = true;
      }

      console.log("success: "+success+", detail: "+detail);
      if(err)console.log(err);
      return res.status(status).send({"success":success, "detail": detail, "data": data});

    });

};

exports.get = function(req,res,next){
  console.log("Get-User request received");

  query = { _id: req.params.qid};
  Question.findOne(query, function (err, data) {
    var detail = "";
    var success = false;
    var status = 200;
    if(err){
      detail = "Internal DB error";
      status = 500;
    }else if(!data){
      detail = "Question Not Found";
      status = 404;
    }else{
      detail = "Question Found";
      status = 200;
      success = true;
    }

    console.log("success: "+success+", detail: "+detail);
    if(err)console.log(err);
    return res.status(status).send({"success":success, "detail": detail, "data": data});

  });
};

exports.list = function(req,res,next){
  console.log("List-Questions request received");

  Question.find({}, function (err, data) {
    var detail = "";
    var success = false;
    var status = 200;
    if(err){
      detail = "Internal DB error";
      status = 500;
    }else if(!data){
      detail = "Questions Not Found";
      status = 404;
    }else{
      detail = "Questions Found";
      status = 200;
      success = true;
    }

    console.log("success: "+success+", detail: "+detail);
    if(err)console.log(err);
    return res.status(status).send({"success":success, "detail": detail, "data": data});

  });
};

exports.mark = function(req,res,next){
  console.log("Mark Question Request Recevied");
  query = { _id: req.body._id};
  upt   = { status: req.body.status};

  Question.findOneAndUpdate(query, upt, {new: true}, function (err, data) {
    var detail = "";
    var success = false;
    var status = 200;
    if(err){
      detail = "Internal DB error";
      status = 500;
    }else if(!data){
      detail = "Question Not Found";
      status = 404;
    }else{
      detail = "Question Marked";
      status = 200;
      success = true;
    }

    console.log("success: "+success+", detail: "+detail);
    if(err)console.log(err);
    return res.status(status).send({"success":success, "detail": detail, "data": data});
  });
};
