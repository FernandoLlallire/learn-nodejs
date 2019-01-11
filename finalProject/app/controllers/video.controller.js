const User = require('../models/User');
const Video = require('../models/Video');
/*Aca el middleware tiene que validarme el token y me deja en el body el id que tiene*/

exports.findAll = (req,res) => {
    User.findById(req.body.id)
    .then(user => res.json(user.videos))
    .catch(err => {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving videos."})
    });
};

/*
tenemos que hacer la bisqueda en base a esto 
https://coderwall.com/p/6v5rcw/querying-sub-documents-and-sub-sub-documents-in-mongoose
*/
/*
exports.findOne = (req,res)=>{
    User.find(req.body.id)
    .then(user => user.videos.forEach(element => {
        console.log(element)
    }))
}; 
*/

exports.findOne = (req, res) => {
    User.findOne({'videos.url':"http://thenewcode.com/assets/videos/editable.mp4"})
    .then(user =>{
        const videoFilter = user.videos.filter((video) => video.url == req.body.url)._id
        res.send(videoFilter)
    })

};

exports.delete = (req, res) => {
    User.findOneAndUpdate({'videos.url':"http://thenewcode.com/assets/videos/editable.mp4"},
   {'$pull':{'videos':{"url":"http://thenewcode.com/assets/videos/after.mp4"}}})
   .then(res.send("elemento eliminado"))//probar por que lo toma como updatiado siempre!
};