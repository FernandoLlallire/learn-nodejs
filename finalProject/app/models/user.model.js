const User = require('../models/User');

const findUserByToken = req => User.findOne({_id:req.token._id,userName:req.token.userName,password:req.token.password});

exports.findUserByToken = req => findUserByToken(req);

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

exports.updateUser = req => User.findByIdAndUpdate(
    req.body._id, {
    name: req.body.name,
    userName: req.body.userName
}, { new: true })
