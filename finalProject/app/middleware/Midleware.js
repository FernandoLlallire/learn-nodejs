//const model = require("../models/indexModel");
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
//https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52
const key = "secret";

exports.verifyRepeat = (req,res,next) => {
  userModel.findUserByToken(req)
  .then(user => {
    let repeated = false;
    user.videos.forEach(element => {
        if(req.body.url == element.url){
          repeated=true;
        }
    })
    if (!repeated){
      next();
    }
    else{
      res.status(409).send({message: "La url ya existe para este usuario"})
    }
  })
}

exports.verifyRepeatNewVideo = (req,res,next) => {
  userModel.findUserByToken(req)
  .then(user => {
    let repeated = false;
    let exist = false;
    user.videos.forEach(element => {
        if(req.body.newUrl == element.url){
          repeated=true;
        }
        if(req.body.url == element.url){
          exist = true;
        }
    })
    
    if (!repeated && exist){
      next();
    }else{
      if (exist)
        res.status(409).send({message: "La nueva url ya existe para este usuario"})
      else
        res.status(404).send({message: "La url no existe para este usuario"})
    }
  })
}
exports.verifyTokenHeader = (req,res,next) => {
  const token = req.headers.authorization.split(' ')[0]==='Bearer' ? req.headers.authorization.split(' ')[1] : '';
    if(token){
      jwt.verify(token, key, (err,deco)=>{
          if(!err){
            //console.log(deco.user)
            req.token=deco.user;
            next(); 
          }
      })
    }else{
      res.redirect('/');
    }
}