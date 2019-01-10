const express = require('express');
const router = express.Router();
const User = require('../models/User');
const expressJoiMiddleware = require('express-joi-middleware');
const Joi = require('joi');
const videoController = require('../controllers/video.controller');
const videoCreateSchema = {
    body: {
        url: Joi.string().required(),
        description: Joi.string().required()
    },
  };
  
  const videoUpdateSchema = {
    body: {
        url: Joi.string().required(),
        description: Joi.string().required()
    },
  };
  
  const options = {
    wantResponse: true,
  };

 
  router.get('/', videoController.findAll);

  
/*  const videoController = require('../controllers/video.controller');
  
  router.post('/', expressJoiMiddleware(videoCreateSchema, options), videoController.create);
  
  router.get('/list', videoController.findAll);
  
  router.get('/:userId', videoController.findOne);
  
  router.put('/:userId', expressJoiMiddleware(videoUpdateSchema, options), videoController.update);
  
  router.delete('/:userId', videoController.delete);
  */
  module.exports = router;