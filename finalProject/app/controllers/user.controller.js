const User = require('../models/User');
const bcrypt = require('bcryptjs');
const path = require('path');
const fetch = require("node-fetch");
const jwt = require('jsonwebtoken');
//const cookieParser = require('cookie-parser');
const key = "secret";
//const url = require('url');
const videoDefault = [{url:'http://thenewcode.com/assets/videos/editable.mp4', description:'editable'},
                      {url:'http://thenewcode.com/assets/videos/after.mp4', description:'after'}];

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
    const newUser = new User({
      name: req.body.name,
      userName: req.body.userName,
      password: hash,
      videos: videoDefault
    });
    newUser.save()
    .then(data => {
      //res.send(data);
      const objJwt = jwt.sign({_id:data._id,userName:data.userName},key);
      res.cookie("logInUser",objJwt, { maxAge: 900000, httpOnly: false });
      //res.send({token : objJwt});
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
  User.findOne({userName:req.body.userName}).exec()
  .then(user => {
    if(!user) {
      return res.status(404).send({
        message: "User not found with userName " + req.body.userName
      });
    }
    bcrypt.compare(req.body.password,user.password,(err,result) => {
      if(result){
        const objJwt = jwt.sign({_id:user._id,userName:user.userName},key);
        res.cookie("logInUser",objJwt, { maxAge: 900000, httpOnly: false });
        //res.send({token : objJwt});
        res.redirect('/list');
      }
      else{
        res.status(401).send({message: "Contraseña incorrecta"});
      }
    })

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

exports.test = (req,res) => {
  res.sendFile(path.join(__dirname,'/../views/users/listVideos.html'));
};
/*
exports.findUserName = (req,res) =>{
  User.findOne({userName:req.body.userName}).exec()
  .then(user => {
    if(!user){
      res.status(400).send({message:'userName not register'});
    } else {
      res.status(200).send(user);
    }
  }).catch(err => {
    console.log(err);
      res.status(500).send({
      message: "Error retrieving userName " + req.params.userName
    });
  })
}

exports.create = (req, res) => {
  fetch(`http://127.0.0.1:3000/api`,{body:{userName:req.body.userName}})
    .then(response => {
      switch(response.status){
        case 200:
          res.status(409).send("usuario ya registrado");
        break;
        case 400:
          bcrypt.hash(req.body.password, 5, (err, hash) => {
            const newUser = new User({
              name: req.body.name,
              userName: req.body.userName,
              password: hash,
              videos: videoDefault
            });
            newUser.save()
            .then(data => res.send(data))
            .catch(err => {
              console.log(err);
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the User."
                });
            });
          });
        break;
        default:
      }
    })
};
exports.logIn = (req, res) => {
  fetch(`http://127.0.0.1:3000/${req.body.userName}`)
    .then(response => {
      switch(response.status){
        case 200:
          return response.json();
        break;
        case 400:
          return Promise.resolve();
        break;
        default:
      }
    })
    .then(x=>{if(x.userName){console.log(x);res.send(x)}else{console.log("nada");res.send("nada")}})
};
*/
