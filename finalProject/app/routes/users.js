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

  const userLogInSchema = {
    body: {
      userName: Joi.string().email().required(),
      password: Joi.string().required()
    }
  };

  const userUpdateSchema = {
    body: {
      name: Joi.string().required(),
      userName: Joi.string().email().required()
    },
  };

  const options = {
    wantResponse: true,
    joiOptions: {abortEarly: false}
  };

  router.get('/', userController.index);
  router.post('/createUser', expressJoiMiddleware(userCreateSchema, options), userController.createUser);
  router.post('/logIn', expressJoiMiddleware(userLogInSchema, options), userController.logIn);
  router.get('/list',middleware.verifyToken, userController.videoList);
  router.put('/apis/createUser', expressJoiMiddleware(userCreateSchema, options), userController.createUserApi);
  router.post('/apis/logIn', expressJoiMiddleware(userLogInSchema, options), userController.logInApi);
  router.delete('/apis/delet', userController.deletApi)
  router.patch('/apis/update', userController.updateApi)
  module.exports = router;
