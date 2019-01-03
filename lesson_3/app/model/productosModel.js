const redis = require("redis");

/*redis*/
const host = process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.0.1';
const port = process.env.REDIS_PORT_6379_TCP_PORT || 6379;
let client = redis.createClient(port, host);

module.exports = {
    existProductos: () => new Promise((resolve, reject) => {
        client.exists("products", (err,reply) => {
            if(reply==1){
                return resolve();
            }
            return reject();
        })
    }),
    setProductos: (productosString) => {
        client.set("products", productosString, (err,reply) => {
            if(reply === "OK"){
                console.log("se guardo los valores de las promociones en redis");
            }else{
                console.log("Problema al escribir en redis");
            }
        })
    },
    getProductos: () =>
      new Promise((resolve,reject) => {
        client.get("products", (err,reply) =>{
          if (err) reject(err);
          resolve(JSON.parse(reply));
        })
      })
}
