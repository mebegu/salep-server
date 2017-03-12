const express   = require('express');
const auth      = require('./controllers/authentication/authController');
const access    = require('./controllers/authentication/accessController');
const user      = require('./controllers/salep/userController');
const question  = require('./controllers/quiz-rush/questionController');

module.exports = function(app) {
  const qrRoutes    = express.Router();
  const salepRoutes = express.Router();
  const admin = [auth.auth, access.isAdmin];
  // TODO centralize embedded strings
  /*-------SALEP ROUTES------------*/
  // User
  salepRoutes.post('/user/apply', user.apply);
  salepRoutes.post('/user/edit',      admin, user.edit); // TODO owner check
  salepRoutes.post('/user/activate',  admin, user.activate);
  salepRoutes.get('/user/:id',        auth.auth, user.get);
  salepRoutes.get('/user',            auth.auth, user.list);

  // Other
  salepRoutes.post('/login', auth.login);

  /*-------QUIZ RUSH ROUTES------------*/
  //Question
  qrRoutes.post('/question/submit', auth.auth, question.submit);
  qrRoutes.post('/question/edit',   admin, question.edit);
  qrRoutes.post('/question/remove', admin, question.remove);
  qrRoutes.post('/question/mark',   admin,  question.mark);
  qrRoutes.get('/question/:id',     auth.auth, question.get);
  qrRoutes.get('/question',         auth.auth, question.list);

  app.use('/qr', qrRoutes);
  app.use('/salep', salepRoutes);
}
