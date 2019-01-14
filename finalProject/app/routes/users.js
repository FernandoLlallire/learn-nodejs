const express = require('express');
const router = express.Router();

const expressJoiMiddleware = require('express-joi-middleware');
const Joi = require('joi');
const userController = require('../controllers/user.controller');

const userCreateSchema = {
    body: {
      name: Joi.string().required(),
      username: Joi.string().email().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'passwords and confirmation must be equals.' } } }),
    },
  };
  
  const userUpdateSchema = {
    body: {
      name: Joi.string().required(),
      username: Joi.string().email().required()
    },
  };
  
  const options = {
    wantResponse: true,
  };
  router.get('/:username',userController.findUserName);
  router.get('/', userController.index);
  router.post('/', expressJoiMiddleware(userCreateSchema, options), userController.create);
  
  /*
  router.get('/create',(req,res)=> res.sendFile(path.join(__dirname,'/../views/createUser.html')));
  router.post('/', expressJoiMiddleware(userCreateSchema, options), userController.create);
  router.get('/list', userController.findAll);
  
  router.get('/:userId', userController.findOne);
  
  router.put('/:userId', expressJoiMiddleware(userUpdateSchema, options), userController.update);
  
  router.delete('/:userId', userController.delete);
  */
  module.exports = router;