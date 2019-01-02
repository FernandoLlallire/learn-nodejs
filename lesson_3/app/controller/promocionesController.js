const redis = require("redis");
const file = require("../File");

/*Configuracion del archivo de promociones*/
const promoFile = file.logFile("../config.json");

/*redis*/
const host = process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.0.1';
const port = process.env.REDIS_PORT_6379_TCP_PORT || 6379;
let client = redis.createClient(port, host);

module.exports = {
    promociones : (req,res) => {
        client.exists("products", (err, reply) =>{
            if(reply){
                console.log("esta cargado en el cache")
            }else{
                console.log("Cargando lista de productos en el cache");
                promoFile.getFileNamePromise()
                .then((fileName) => { 
                    const promoDataFile = file.fileFactory(fileName);
                    promoDataFile.readFile()
                    .then(mensaje => console.log(mensaje))
                })
            }
        })
    }
}