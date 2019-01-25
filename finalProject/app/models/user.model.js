const User = require('../models/User');
const Video = require('../models/Video');


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

exports.deleteByID = req => User.findByIdAndRemove(req.body._id)
