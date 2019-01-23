const User = require('../models/User');
const Video = require('../models/Video');

const findUserByToken = req => User.findOne({_id:req.token._id,userName:req.token.userName});

exports.findUserByToken = req => findUserByToken(req);

exports.elementDeletePromise = req => 
    User.findOneAndUpdate({ 
        _id:req.token._id,
        userName:req.token.userName},
        {'$pull':{'videos':{ _id:req.body._id }}
})
.then(data => data.videos)

exports.addVideoPromise = (req,res) => {
    findUserByToken(req)
    .then(user =>{
       user.videos.push({url:req.body.url,description:req.body.description});
       user.save()
       .then(data => res.status(200).send({message: "Video agregado", data:data.videos}))
       .catch(err => {
           res.status(500).send({ message: err.message || "Error al agregar videos"})
       });
    }
    )
}

exports.findElementoToUpdate = req =>  User.findOneAndUpdate({
    _id:req.token._id,userName:req.token.userName,
    "videos.url":req.body.url,
    "videos.description":req.body.description
  },
  {'$set':{
      'videos.$.url':req.body.newUrl,
      'videos.$.description':req.body.newDescription
      }
})
.then(data => data.videos)

exports.saveNewUSer = (req,hash,videoDefault) => {
    const newUser = new User({
        name: req.body.name,
        userName: req.body.userName,
        password: hash,
        videos: videoDefault
      });
    return newUser.save()
}

exports.logInOnlyByName = (req) => User.findOne({userName:req.body.userName})