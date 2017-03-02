const express = require('express');
const authController = require('./controllers/authentication/authController');
const accessController = require('./controllers/authentication/accessController');
const user = require('./controllers/salep/userController');
const question = require('./controllers/quiz-rush/questionController');

module.exports = function(app) {
  const qrRoutes = express.Router();
  const salepRoutes = express.Router();
  var cont = [authController.auth, accessController.canAccess];
  //Quiz Rush routes
  qrRoutes.post("/question/submit", cont,  question.submit);
  qrRoutes.post("/question/mark", cont,  question.mark);
  qrRoutes.get("/question/:qid", authController.auth, question.get);
  qrRoutes.get("/question", authController.auth, question.list);

  salepRoutes.post("/user/updateAccess", cont, user.updateAccess);
  salepRoutes.get("/user/:uid", authController.auth, user.get);
  salepRoutes.get("/user", authController.auth, user.list);

  salepRoutes.post('/login', authController.login);
  salepRoutes.post("/apply", authController.apply);


  app.use('/qr', qrRoutes);
  app.use('/salep', salepRoutes);
}
