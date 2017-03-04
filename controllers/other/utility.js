exports.respond = function(res, status, success, detail, data, err) {
  console.log('success: '+success+', detail: '+detail);
  if(err)console.log(err);
  return res.status(status)
            .send({'success': success, 'detail': detail, 'data': data});
};
