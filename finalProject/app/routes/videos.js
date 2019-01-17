const express = require('express');
const router = express.Router();
const User = require('../models/User');
const expressJoiMiddleware = require('express-joi-middleware');
const Joi = require('joi');
const videoController = require('../controllers/video.controller');
const middleware = require('../middleware/Midleware');

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
  
  router.use(middleware.verifyToken);
  router.get('/api/list', videoController.findAll);//Aca vamos a listar
  router.post('/api/add',videoController.add);
  //router.get('/:url', videoController.findAll);//Aca vamos a editar
  //router.get('/new', videoController.findAll);//Aca vamos a agregar
  router.delete('/api/delete/:_id',videoController.delete);//Aca vamos a borrar

  module.exports = router;