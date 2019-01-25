const User = require('../models/User');
const userModel = require('../models/user.model')



exports.elementDeletePromise = (req,res) =>
    User.findOne({
        _id:req.token._id,
        userName:req.token.userName,
        password:req.token.password,"videos._id":req.body._id}
)

exports.addVideoPromise = (req,res) =>
    userModel.findUserByToken(req)
    .then(user =>{
       user.videos.push({url:req.body.url,description:req.body.description})
       return user.save()
    }
)

exports.findElementoToUpdate = req =>
    User.findOneAndUpdate({
        _id:req.token._id,userName:req.token.userName,password:req.token.password,
        "videos.url":req.body.url,
        "videos.description":req.body.description
    },
    {'$set':{

        'videos.$.url':req.body.newUrl,
        'videos.$.description':req.body.newDescription
        }
    },
    {new:true})
.then(data => data)

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
