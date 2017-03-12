const express   = require('express');
const auth      = require('./controllers/authentication/authController');
const access    = require('./controllers/authentication/accessController');
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

  // Other
  salepRoutes.post('/login', auth.login);

  /*-------QUIZ RUSH ROUTES------------*/
  //Question
  qrRoutes.post('/question/submit', cont, question.submit);
  qrRoutes.post('/question/edit',   cont, question.edit);
  qrRoutes.post('/question/remove', cont, question.remove);
  qrRoutes.post('/question/mark',   cont,  question.mark);
  qrRoutes.get('/question/:qid',    auth.auth, question.get);
  qrRoutes.get('/question',         auth.auth, question.list);

  app.use('/qr', qrRoutes);
  app.use('/salep', salepRoutes);
}
