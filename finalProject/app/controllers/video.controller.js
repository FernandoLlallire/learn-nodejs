const User = require('../models/User');
const Video = require('../models/Video');
/*Aca el middleware tiene que validarme el token y me deja en el body el id que tiene*/

exports.findAll = (req,res) => {
    User.findOne({_id:req.token._id,userName:req.token.userName})
    .then(user => res.status(200).json(user.videos))
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
//https://stackoverflow.com/questions/44233791/fetch-can-you-pass-parameters-to-the-server
exports.delete = (req, res) => {
    User.findOneAndUpdate({_id:req.token._id,userName:req.token.userName},
   {'$pull':{'videos':{_id:req.params._id}}})
    .then(user => res.status(200).send({message: "Video eliminado", user}))
    .catch(err => {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving videos."})
    });
};

exports.add = (req,res) => {
    User.findOne({_id:req.token._id,userName:req.token.userName})
    .then(user =>{
       user.videos.push({url:req.body.url,description:req.body.description});
       user.save()
       .then(data => res.status(200).send({message: "Video agregado", data}))
    }
  )
};

//el problema es q el body esta vacio!"https://stackoverflow.com/questions/39842013/fetch-post-with-body-data-not-working-params-empty"
