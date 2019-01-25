const userModel = require('../models/user.model');
const videoModel = require('../models/video.model');

exports.findAll = (req,res) => {
    userModel.findUserByToken(req)
    .then(user => res.status(200).json(user.videos))
    .catch(err => {
        res.status(500).send({ message: err.message || "Error al lisar videos"})
    });
};

exports.delete = (req, res) => {
    videoModel.elementDeletePromise(req,res)
    .then(result => {
      if (!result) return res.status(404).send({message: "Url de video no existente para el usuario"});
      result.videos.id(req.body._id).remove();
      result.save()
      .then(data => res.status(200).send({message: "Video eliminado", data:data.videos}))
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Error al borrar videos"})
    });
};

exports.add = (req,res) => {
    videoModel.addVideoPromise(req,res)
  .then(data => res.status(200).json({message: "Video agregado", data:data.videos}))
  .catch(err => {
      res.status(500).send({ message: err.message || "Error al agregar videos"})
  });
};

exports.update = (req,res) => {
    videoModel.findElementoToUpdate(req)
  .then(data => res.status(200).send({message: "Video editado", data:data.videos}))
  .catch(err => {
      res.status(500).send({ message: err.message || "Error al Actualizar videos"})
  });
}
