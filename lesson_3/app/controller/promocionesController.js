const file = require("../File");
const model = require("../model/productosModel");
/*Configuracion del archivo de promociones*/
const promoFile = file.logFile("/src/app/config.json");


module.exports = {
    promociones : (req,res) => {
        model.existProductos()
        .catch(() => promoFile.getFileNamePromise()
            .then((fileName) => { 
                const promoDataFile = file.fileFactory(fileName);
                promoDataFile.readFile()
                .then(mensaje => model.setProductos(mensaje));
                //console.log("entro al catch");

            })
        )
        .then(
            () => {
                console.log("Los productos estan cargados en el cache");
                console.log("datos: "+ model.getProductos())
            }
        )

        /*client.exists("products", (err, reply) =>{
            if(reply){
                console.log("Los productos estan cargados en el cache");
                client.get("products", (err,reply) => {
                    res.send(JSON.parse(reply)) ;
                })
            }else{
                
                
            }
        })*/
    }
}