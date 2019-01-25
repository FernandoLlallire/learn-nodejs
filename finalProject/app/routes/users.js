const express = require('express');
const router = express.Router();
const path = require('path');
const middleware = require('../middleware/Midleware');
const expressJoiMiddleware = require('express-joi-middleware');
const Joi = require('joi');
const userController = require('../controllers/user.controller');

const userCreateSchema = {
    body: {
      name: Joi.string().required(),
      userName: Joi.string().email().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'passwords and confirmation must be equals.' } } })
    },
  };
  const userDeleteSchema = {
    body: {
      _id: Joi.string().required()
    }
  };
  const userLogInSchema = {
    body: {
      userName: Joi.string().email().required(),
      password: Joi.string().required()
    }
  };

  const userUpdateSchema = {
    body: { 
      _id: Joi.string().required(),
      name: Joi.string().required(),
      userName: Joi.string().email().required()
    }
  };

  const options = {
    wantResponse: true,
    joiOptions: {abortEarly: false}
  };

  router.get('/', userController.index);
  router.get('/list', userController.videoList);
  router.put('/user/createUser', expressJoiMiddleware(userCreateSchema, options), userController.createUserApi);
  router.post('/user/logIn', expressJoiMiddleware(userLogInSchema, options), userController.logInApi);
  router.delete('/user/delete', expressJoiMiddleware(userDeleteSchema, options), userController.deleteApi);
  router.patch('/user/update', expressJoiMiddleware(userUpdateSchema, options), userController.updateApi);
  router.get('/user/userData', middleware.verifyTokenHeader, userController.obtainUserData);
  module.exports = router;
