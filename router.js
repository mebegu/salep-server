const express   = require('express');
const auth      = require('./controllers/authentication/authController');
const access    = require('./controllers/authentication/accessController');
const user      = require('./controllers/salep/userController');
const blog      = require('./controllers/salep/blogController');
const question  = require('./controllers/quiz-rush/questionController');

module.exports = function(app) {
  const qrRoutes    = express.Router();
  const salepRoutes = express.Router();
  const cont = [auth.auth, access.canAccess];

  /*-------SALEP ROUTES------------*/
  // User
  salepRoutes.post("/user/apply", user.apply);
  salepRoutes.post('/user/edit', cont, user.edit); // TODO Owner check, and uid from url
  salepRoutes.post("/user/updateAccess", cont, user.updateAccess);
  salepRoutes.get("/user/:uid",  auth.auth, user.get);
  salepRoutes.get("/user",       auth.auth, user.list);
  // TODO change password

  // Blog
  salepRoutes.post('/blog/create',  cont, blog.create);
  salepRoutes.post('/blog/edit/',   cont, blog.edit); // TODO Author check, and bid from url
  salepRoutes.post('/blog/remove',  cont, blog.remove); // TODO Author check, and bid from url
  salepRoutes.get('/blog/bid', blog.get); // TODO populate author id, name
  salepRoutes.get('/blog',     blog.list); // TODO populate author id, name

  // Other
  salepRoutes.post('/login', auth.login);

  /*-------QUIZ RUSH ROUTES------------*/
  //Question
  qrRoutes.post("/question/submit", cont,  question.submit);
  qrRoutes.post('/question/edit/',  cont, question.edit); // TODO Author check, and bid from url
  qrRoutes.post('/question/remove', cont, question.remove); // TODO Author check, and bid from url
  qrRoutes.post("/question/mark",   cont,  question.mark);
  qrRoutes.get("/question/:qid",    auth.auth, question.get); // TODO populate author id, name
  qrRoutes.get("/question",         auth.auth, question.list); // TODO populate author id, name

  app.use('/qr', qrRoutes);
  app.use('/salep', salepRoutes);
}
