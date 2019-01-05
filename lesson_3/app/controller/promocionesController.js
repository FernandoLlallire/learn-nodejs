const file = require("../File");
const model = require("../model/productosModel");
/*Configuracion del archivo de promociones*/
const promoFile = file.logFile("/src/app/config.json");

module.exports = {
    promociones : (req,res) => {
        model.getProductos()
        .then(promociones => res.send(promociones))
        .catch( () => res.status(204).send())
    },
    refresh : (req,res) => {
        promoFile.getFileNamePromise()
        .then((fileName) => {
            const promoDataFile = file.fileFactory(fileName);
            promoDataFile.readFile()
            .then(mensajeJson => model.setProductos(mensajeJson))
            .then(() => res.status(200).send())
            .catch( () => res.status(204).send())
        })
    },
    clean : (req,res) => {
        model.cleanCache()
        .then(() => res.status(200).send())
        .catch(() => res.status(204).send())
    }
}
