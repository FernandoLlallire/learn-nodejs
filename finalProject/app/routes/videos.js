const express = require('express');
const router = express.Router();
const User = require('../models/User');
const expressJoiMiddleware = require('express-joi-middleware');
const Joi = require('joi');
const videoController = require('../controllers/video.controller');
const middleware = require('../middleware/Midleware');

const videoAddSchema = {
    body: {
        url: Joi.string().required(),
        description: Joi.string().required()
    },
  };

  const videoUpdateSchema = {
    body: {
        url: Joi.string().required(),
        description: Joi.string().required(),
        newUrl: Joi.string().required(),
        newDescription: Joi.string().required()
    },
  };
  const videoDeleteSchema = {
    body: {
        _id: Joi.string().required()
    },
  };
  const options = {
    wantResponse: true,
  };

  router.use(middleware.verifyTokenHeader);
  router.get('/api/list', videoController.findAll);
  router.put('/api/add', expressJoiMiddleware(videoAddSchema, options), middleware.verifyRepeat, videoController.add);
  router.delete('/api/delete/', expressJoiMiddleware(videoDeleteSchema, options),videoController.delete);
  router.patch('/api/update/', expressJoiMiddleware(videoUpdateSchema, options), middleware.verifyRepeatNewVideo, videoController.update)

  module.exports = router;
