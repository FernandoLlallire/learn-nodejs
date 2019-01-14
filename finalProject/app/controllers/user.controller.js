const User = require('../models/User');
const bcrypt = require('bcryptjs');
const path = require('path');
const fetch = require("node-fetch");

const videoDefault = [{url:'http://thenewcode.com/assets/videos/editable.mp4', description:'editable'},
                      {url:'http://thenewcode.com/assets/videos/after.mp4', description:'after'}];

const routeDomain = 'http://localhost:3030/';

exports.index = (req,res) => {
  res.sendFile(path.join(__dirname,'/../views/userForm.html'));
};

exports.findUserName = (req,res) =>{
  res.status(200).send(req.params.username)
  //User.findOne({username:req.params.username}).exec()
  //.then(user => res.send(user)) 
}

exports.create = (req, res) => {
  console.log("Corriendo el fetch")
  fetch('10.0.2.2:3030/fer')
    .then(response => res.send(response)) // expecting a json response
    .then(json => res.send(json))
    .catch(err=>res.json(err))
  //console.log(path.join(routeDomain, req.body.name))
  //fetch('localhost:3030/holaFer')
  //.then(res => res.send("llego"))
  //.then(response => response.json())
  //.then(responseJson => res.send(responseJson))
  //.catch(err=>res.json(err))

  /*
  bcrypt.hash(req.body.password, 5, function(err, hash) {
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: hash,
      videos: videoDefault
    });
    newUser.save()
  .then(data => {
      res.send(data);
  }).catch(err => {
    console.log(err);
      res.status(500).send({
          message: err.message || "Some error occurred while creating the User."
      });
  });
  });
  */
};

/*
exports.findAll = (req, res) => {
  User.find()
  .then(users => {
    res.send(users);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving users."
    });
  });
};

exports.findOne = (req, res) => {
  User.findById(req.params.userId)
  .then(user => {
    if(!user) {
      return res.status(404).send({
        message: "User not found with id " + req.params.userId
      });            
    }
    res.send(user);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "User not found with id " + req.params.userId
      });                
    }
    return res.status(500).send({
      message: "Error retrieving User with id " + req.params.userId
    });
  });
};

exports.update = (req, res) => {
  User.findByIdAndUpdate(req.params.userId, {
    name: req.body.name,
    username: req.body.username
  }, { new: true })
  .then(user => {
    if(!user) {
      return res.status(404).send({
        message: "User not found with id " + req.params.userId
      });
    }
    res.send(user);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "User not found with id " + req.params.userId
      });                
    }
    return res.status(500).send({
      message: "Error updating User with id " + req.params.userId
    });
  });
};

exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
  .then(user => {
    if(!user) {
      return res.status(404).send({
        message: "User not found with id " + req.params.userId
      });
    }
    res.send({message: "User deleted successfully!"});
  }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        message: "User not found with id " + req.params.userId
      });                
    }
    return res.status(500).send({
      message: "Could not delete User with id " + req.params.userId
    });
  });
};
*/