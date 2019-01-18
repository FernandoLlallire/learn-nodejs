//const model = require("../models/indexModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
let User = require('../models/User');
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
    }
    /*if(!token) res.status(403).redirect('/');
    jwt.verify(token, key, (err,deco)=>{
        if(err) res.status(403).redirect('/');
        req.token=deco;
        next();
    });*/
}
exports.verifyAdd = (req,res,next) => {
  //res.redirect('/list');
  User.findOne({_id:req.token._id,userName:req.token.userName})
  .then(user => {
    let repetead = false;
    user.videos.forEach(element => {
        if(req.body.url == element.url){
          repetead=true;
        }
    })
    if (!repetead){
      next();
    }
  })
}
