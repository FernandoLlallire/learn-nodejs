const express = require('express');
const router = express.Router();

const expressJoiMiddleware = require('express-joi-middleware');
const Joi = require('joi');
const userController = require('../controllers/user.controller');
const midleware = require('../controllers/indexMidleware');

const userCreateSchema = {
    body: {
      name: Joi.string().required(),
      userName: Joi.string().email().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'passwords and confirmation must be equals.' } } }),
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
  };
  
  router.get('/', userController.index);
  router.post('/createUser', expressJoiMiddleware(userCreateSchema, options), userController.createUser);
  router.post('/logIn',expressJoiMiddleware(userLogInSchema, options), userController.logIn);
/*
  router.post('/', expressJoiMiddleware(userCreateSchema, options), userController.create);

  router.get('/list', userController.findAll);

  router.get('/:userId', userController.findOne);

  router.put('/:userId', expressJoiMiddleware(userUpdateSchema, options), userController.update);

  router.delete('/:userId', userController.delete);
  /*
  router.post('/createUser', expressJoiMiddleware(userCreateSchema, options), userController.create);
  router.post('/logIn',expressJoiMiddleware(userLogInSchema, options), userController.logIn);
  router.get('/api',userController.findUserName);
  */

 router.post('/login', midleware.login);
 router.get('/dashboard',midleware.verifyToken,midleware.dashboard);
 
  module.exports = router;