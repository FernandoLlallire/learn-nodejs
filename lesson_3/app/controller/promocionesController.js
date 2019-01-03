const file = require("../File");
const model = require("../model/productosModel");
/*Configuracion del archivo de promociones*/
const promoFile = file.logFile("/src/app/config.json");
let updateCache = fileName => {
    const promoDataFile = file.fileFactory(fileName);
    promoDataFile.readFile()
    .then(mensaje => model.setProductos(JSON.stringify(JSON.parse(mensaje))));
    /*
    La lectura del json traia caracteres invalidos como el de fin de linea y otros
    se corrige en de esta manera
    https://stackoverflow.com/questions/42494823/json-parse-returns-string-instead-of-object
    */
};

module.exports = {
    promociones : (req,res) => {
        model.existProductos()
        .catch(() => promoFile.getFileNamePromise()
            .then((fileName) => {
                updateCache();
            })
        )
        .then(
            () => {
                console.log("Los productos estan cargados en el cache");
                model.getProductos()
                .then(promociones =>{
                  res.render('promociones', { title: 'Promociones', promos: promociones.promociones})
                }
                )
            }
        )
    },
    refresh : (req,res) => {
        promoFile.getFileNamePromise()
        .then((fileName) => {
            updateCache(fileName);
            model.getProductos()
                .then(promociones =>{
                  res.render('refresh', { title: 'Refresh', promos: promociones.promociones})
                }
                )
                .catch(err => {
                    console.log("error en el refresh " + err);
                })
        })
    },
    clean : (req,res) => {
        promoFile.getFileNamePromise()
        .then((fileName) => {
            model.cleanCache()
        })
    }
}
