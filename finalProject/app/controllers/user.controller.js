const User = require('../models/User');
const bcrypt = require('bcryptjs');
const path = require('path');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const key = "secret";

const videoDefault = [{url:'http://thenewcode.com/assets/videos/editable.mp4', description:'editable'},
                      {_id: '5c4a0e26c747a400231208b3',url:'http://thenewcode.com/assets/videos/after.mp4', description:'after'}];
//http://thenewcode.com/assets/videos/ 
exports.index = (req,res) => {
  res.sendFile(path.join(__dirname,'/../views/users/userForm.html'));
};

exports.createUser = (req,res) => {
  return new Promise((resolve,reject) => {
    bcrypt.hash(req.body.password, 5, (err,hash) =>{
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    })
  })
  .catch(err => res.send(err))
  .then(hash =>{
    userModel.saveNewUSer(req,hash,videoDefault)
    .then(data => {
      const objJwt = jwt.sign({_id:data._id,userName:data.userName,password:data.password},key);
      res.cookie("logInUser",objJwt, { maxAge: 900000, httpOnly: false });
      res.redirect('/list');
    })
    .catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while creating the User."
      });
    });
  });
};

exports.logIn = (req,res) => {
  userModel.logInOnlyByName(req)
  .then(user => {
    if(!user) {
      return res.status(404).send({
        message: "User not found with userName " + req.body.userName
      });
    }
    bcrypt.compare(req.body.password,user.password,(err,result) => {
      if(result){
        const objJwt = jwt.sign({_id:user._id,userName:user.userName,password:user.password},key);
        res.cookie("logInUser",objJwt, { maxAge: 900000, httpOnly: false });
        res.redirect('/list');
      }
      else{
        res.status(401).send({message: "Contraseña incorrecta"});
      }
    });

  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "User not found with username " + req.body.userName
      });
    }
    return res.status(500).send({
      message: "Error retrieving User with req.body.userName " + req.body.userName
    });
  });
};

exports.videoList = (req,res) => res.sendFile(path.join(__dirname,'/../views/users/videoList.html'));