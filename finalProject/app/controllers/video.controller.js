const User = require('../models/User');
const Video = require('../models/Video');
/*Aca el middleware tiene que validarme el token y me deja en el body el id que tiene*/

exports.findAll = (req,res) => {
    User.findOne({_id:req.token._id,userName:req.token.userName})
    .then(user => res.status(200).json(user.videos))
    .catch(err => {
        res.status(500).send({ message: err.message || "Error al lisar videos"})
    });
};

/*
tenemos que hacer la bisqueda en base a esto
https://coderwall.com/p/6v5rcw/querying-sub-documents-and-sub-sub-documents-in-mongoose
*/

//https://stackoverflow.com/questions/44233791/fetch-can-you-pass-parameters-to-the-server
exports.delete = (req, res) => {
    User.findOneAndUpdate({_id:req.token._id,userName:req.token.userName},
   {'$pull':{'videos':{_id:req.body._id}}})
    .then(user => res.status(200).send({message: "Video eliminado", user}))
    .catch(err => {
        res.status(500).send({ message: err.message || "Error al borrar videos"})
    });
};

exports.add = (req,res) => {
    User.findOne({_id:req.token._id,userName:req.token.userName})
    .then(user =>{
       user.videos.push({url:req.body.url,description:req.body.description});
       user.save()
       .then(data => res.status(200).send({message: "Video agregado", data}))
       .catch(err => {
           res.status(500).send({ message: err.message || "Error al agregar videos"})
       });
    }
  )
};
//https://stackoverflow.com/questions/26156687/mongoose-find-update-subdocument
exports.update = (req,res) => {
  User.findOneAndUpdate({
      _id:req.token._id,userName:req.token.userName,
      "videos.url":req.body.url,
      "videos.description":req.body.description
    },
    {'$set':{
        'videos.$.url':req.body.newUrl,
        'videos.$.description':req.body.newDescription
        }
    })
  .then(user => res.status(200).send({message: "Video editado", user}))
  .catch(err => {
      res.status(500).send({ message: err.message || "Error al Actualizar videos"})
  });
}
