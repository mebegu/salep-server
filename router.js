const express   = require('express');
const auth      = require('./controllers/authentication/authController');
const access    = require('./controllers/authentication/accessController');
const role      = require('./controllers/authentication/roleController');
const user      = require('./controllers/salep/userController');
const blog      = require('./controllers/salep/blogController');
const question  = require('./controllers/quiz-rush/questionController');

module.exports = function(app) {
  const qrRoutes    = express.Router();
  const salepRoutes = express.Router();
  const cont = [auth.auth, access.canAccess];

  // TODO centralize embedded strings
  /*-------SALEP ROUTES------------*/
  // User
  salepRoutes.post('/user/apply', user.apply);
  salepRoutes.post('/user/edit', cont, user.edit); // TODO owner check
  salepRoutes.post('/user/activate', cont, user.activate);
  salepRoutes.get('/user/:uid',  auth.auth, user.get);
  salepRoutes.get('/user',        user.list);
  // TODO change password

  // Blog
  salepRoutes.post('/blog/create',  cont, blog.create)
  salepRoutes.post('/blog/edit/',   cont, blog.edit);
  salepRoutes.post('/blog/remove',  cont, blog.remove);
  salepRoutes.post('/blog/publish', cont, blog.publish);
  salepRoutes.get('/blog/:bid', blog.get); // TODO Restrict Unpublished
  salepRoutes.get('/blog',     blog.list); // TODO Restrict Unpublished

  // Role
  salepRoutes.post('/role/create',    cont,  role.createRole);
  salepRoutes.post('/role/edit/',     cont,  role.edit);
  salepRoutes.post('/role/remove',    cont,  role.remove);
  salepRoutes.post('/role/setUser',   cont,  role.setUser);
  salepRoutes.post('/role/removeUser',cont,  role.removeUser);
  salepRoutes.get('/role/:qid',       cont,  role.get);
  salepRoutes.get('/role',            cont,  role.list);

  // Other
  salepRoutes.post('/login', auth.login);
  salepRoutes.post('/refreshToken', auth.auth, auth.refresh);

  /*-------QUIZ RUSH ROUTES------------*/
  //Question
  qrRoutes.post('/question/submit', cont,  question.submit);
  qrRoutes.post('/question/edit/',  cont, question.edit);
  qrRoutes.post('/question/remove', cont, question.remove);
  qrRoutes.post('/question/mark',   cont,  question.mark);
  qrRoutes.get('/question/:qid',    auth.auth, question.get);
  qrRoutes.get('/question',         auth.auth, question.list);

  app.use('/qr', qrRoutes);
  app.use('/salep', salepRoutes);
}
