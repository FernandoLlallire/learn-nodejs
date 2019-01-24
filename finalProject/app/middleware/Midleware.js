//const model = require("../models/indexModel");
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
//https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52
const key = "secret";
exports.verifyToken = (req,res,next) => {
    const token = req.cookies.logInUser;
    if(token){
      jwt.verify(token, key, (err,deco)=>{
          if(!err){
            req.token=deco;
            next();
          }
      })
    }else{
      res.redirect('/');
    }
}
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
  })
}

exports.verifyRepeatNewVideo = (req,res,next) => {
  userModel.findUserByToken(req)
  .then(user => {
    let repeated = false;
    user.videos.forEach(element => {
        if(req.body.newUrl == element.url){
          repeated=true;
        }
    })
    
    if (!repeated){
      next();
    }
  })
}
exports.verifyTokenHeader = (req,res,next) => {
  const token = req.headers.authorization.split(' ')[0]==='Bearer' ? req.headers.authorization.split(' ')[1] : '';
    if(token){
      jwt.verify(token, key, (err,deco)=>{
          if(!err){
            req.token=deco;
            next(); 
          }
      })
    }else{
      res.redirect('/');
    }
}