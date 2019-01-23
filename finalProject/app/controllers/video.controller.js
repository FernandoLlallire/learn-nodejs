const userModel = require('../models/user.model');

exports.findAll = (req,res) => {
    userModel.findUserByToken(req)
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
    userModel.elementDeletePromise(req)
    .then(data => res.status(200).send({message: "Video eliminado", data}))
    .catch(err => {
        res.status(500).send({ message: err.message || "Error al borrar videos"})
    });
};

exports.add = (req,res) => {
  userModel.addVideoPromise(req,res);
};
//https://stackoverflow.com/questions/26156687/mongoose-find-update-subdocument
exports.update = (req,res) => {
 userModel.findElementoToUpdate(req)
  .then(data => res.status(200).send({message: "Video editado", data}))
  .catch(err => {
      res.status(500).send({ message: err.message || "Error al Actualizar videos"})
  });
}