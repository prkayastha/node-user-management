var express = require('express');
var router = express.Router();

const env = process.env.NODE_ENV || 'development';
const settings = require(__dirname + '/../config/settings.json')[env];

const userOperation = require('../controller/user');
const User = require('../prototypes/users/users');

const errorHandler = require('../controller/errorHandler');

/* Post user information */
router.post('/add', function (req, res) {
  const user = new User();
  user.setData(req.body, settings.seperateUsername);
  userOperation.add(user).then(userResponse => {
    res.send(userResponse);
  }).catch(error => {
    errorHandler(res, error);
  });
});

/* update user information */
router.put('/update/:userId', function(req, res) {
  const userId = req.params.userId;
  const user = new User();
  user.setData(req.body, settings.seperateUsername);
  userOperation.update(userId, user).then(userResponse => {
    res.send(userResponse);
  }).catch(error => {
    errorHandler(res, error);
  });
});

/* Delete user by Id */
router.delete('/delete/:userId', function(req, res){
  const userId = req.params.userId;
  userOperation.deleteUser(userId).then(userResponse => {
    res.send(userResponse);
  }).catch(error => {
    errorHandler(res, error);
  });
});

/* Activate user */
router.get('/activate/:hash', function(req, res){
  const hashString = req.params.hash;
  const userEmail = req.query.email;

  userOperation.activate(hashString, userEmail).then(activationResponse => {
    res.send(activationResponse);
  }).catch(error => {
    errorHandler(res, error);
  });
});

module.exports = router;
