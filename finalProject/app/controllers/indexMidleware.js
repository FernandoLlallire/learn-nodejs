//const model = require("../models/indexModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
let User = require('../models/User');
//https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52
const key = "secret";
module.exports = {
    login : (req,res,next) => {
            User.findById(req.body.userId)
            .then(user => {
              if(!user) {
                return res.status(404).send({
                  message: "User not found with id " + req.body.userId
                });            
              }
              const objJwt = jwt.sign({user_id:user._id},key);
              res.send({token : objJwt});
            }).catch(err => {
              if(err.kind === 'ObjectId') {
                return res.status(404).send({
                  message: "User not found with id " + req.body.userId
                });                
              }
              return res.status(500).send({
                message: "Error retrieving User with id " + req.body.userId
              });
            });
    },
    verifyToken: (req,res,next)=>{
        const token = req.body.token;
        if(!token) return res.status(403).send({auth: "false",message:"No token provided."});
        jwt.verify(token, key, (err,decoded)=>{
            if(err) return res.status(500).send({auth: "false",message:"Failed to authenticate token."});
            req.userId=decoded;
            next();
        });
    },
    dashboard: (req,res,next) =>{
        User.findById(req.userId.user_id)
            .then(user => {
              if(!user) {
                return res.status(404).send({
                  message: "User not found with id " + req.userId.user_id
                });            
              }
            res.json({name:user.name,username:user.username});
            }).catch(err => {
              if(err.kind === 'ObjectId') {
                return res.status(404).send({
                  message: "User not found with id " + req.userId.user_id
                });                
              }
              return res.status(500).send({
                message: "Error retrieving User with id " + req.userId.user_id
              });
            });
    }
}
