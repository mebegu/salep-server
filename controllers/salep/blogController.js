const Blog = require('./../../models/salep/Blog');
const utility = require('./../other/utility.js');

exports.create = function(req,res,next){
  console.log("Create Blog Request Received");

  var object = {
    title: req.body.title,
    content: req.body.content,
    author: req.user._id,
    image: req.body.image,
    tags: req.body.tags,
    isPublished: req.body.isPublished;
  };
  const data = new Blog(object);
  data.save(err => {
    var detail = "";
    var success = false;
    var status = 200;
    if(err){
      detail = "Internal DB error";
      status = 500;
    }else{
      detail = "Blog Submitted";
      status = 200;
      success = true;
    }
    return utility.repond(res, status, success, detail, data, err);
    /*console.log("success: "+success+", detail: "+detail);
    if(err)console.log(err);
    return res.status(status).send({"success":success, "detail": detail, "data": data});*/

  });
};

exports.get = function(req,res,next){
  console.log("Get-Blog request received");

  query = { _id: req.params.bid};
  Blog.findOne(query, function (err, data) {
    var detail = "";
    var success = false;
    var status = 200;
    if(err){
      detail = "Internal DB error";
      status = 500;
    }else if(!data){
      detail = "Blog Not Found";
      status = 404;
    }else{
      detail = "Blog Found";
      status = 200;
      success = true;
    }
    return utility.repond(res, status, success, detail, data, err);
    /*console.log("success: "+success+", detail: "+detail);
    if(err)console.log(err);
    return res.status(status).send({"success":success, "detail": detail, "data": data});*/

  });
};

exports.list = function(req,res,next){
  console.log("List-Questions request received");
  var options = {
    skip:0, // Starting Row
    limit:10, // Ending Row
    sort:{
      date: -1 //Sort by Date Added DESC
    }}
  var query = {}
  if(req.query.start)
    options.skip = req.query.start;

  if(req.query.end)
    options.limit = req.query.end;

  if((options.limit-options.skip)<0 || (options.limit-options.skip)>30){
    return utility.repond(res, 400, false, "Bad Request", null, null);
    //console.log("success: false, detail: Bad Request");
    //return res.status(400).send({"success": false, "detail": "Bad Request", "data": null});
  }
  Blog.find(req.query, options, function (err, data) {
    var detail = "";
    var success = false;
    var status = 200;
    if(err){
      detail = "Internal DB error";
      status = 500;
    }else if(!data){
      detail = "Blogs Not Found";
      status = 404;
    }else{
      detail = "Blogs Found";
      status = 200;
      success = true;
    }

    return utility.repond(res, status, success, detail, data, err);
    /*console.log("success: "+success+", detail: "+detail);
    if(err)console.log(err);
    return res.status(status).send({"success":success, "detail": detail, "data": data});*/

  });
};
