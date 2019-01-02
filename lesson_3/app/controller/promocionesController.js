const redis = require("redis");
const file = require("../File");

/*Configuracion del archivo de promociones*/
const promoFile = file.logFile("/src/app/config.json");

/*redis*/
const host = process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.0.1';
const port = process.env.REDIS_PORT_6379_TCP_PORT || 6379;
let client = redis.createClient(port, host);

module.exports = {
    promociones : (req,res) => {
        client.exists("products", (err, reply) =>{
            if(reply){
                console.log("esta cargado en el cache");
                client.get("products", (err,reply) => {
                    res.send(JSON.parse(reply)) ;
                })
            }else{
                console.log("Cargando lista de productos en el cache");
                promoFile.getFileNamePromise()
                .then((fileName) => { 
                    const promoDataFile = file.fileFactory(fileName);
                    promoDataFile.readFile()
                    .then(mensaje => client.set("products", mensaje, (err,reply) => {
                        console.log("se guardo los valores de las promociones en redis")
                    }))
                })
            }
        })
    }
}