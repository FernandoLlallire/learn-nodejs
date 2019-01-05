const redis = require("redis");

/*redis*/
const host = process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.0.1';
const port = process.env.REDIS_PORT_6379_TCP_PORT || 6379;
let client = redis.createClient(port, host);

module.exports = {
    existProductos: () => new Promise((resolve, reject) => {
        client.exists("promos", (err,reply) => {
            if(reply==1){
                return resolve();
            }
            return reject();
        })
    }),
    
    setProductos: (promos) => 
      new Promise((resolve,reject) => {
          client.set("promos", promos, (err,reply) =>{
            if (reply==="OK") resolve();
            reject();
        })
    }),
    
    getProductos: () =>
      new Promise((resolve,reject) => {
        client.get("promos", (err,reply) =>{
          if (!reply) reject();
          resolve(JSON.parse(reply))
        })
      }),

    cleanCache : () => 
        new Promise((resolve,reject) => {
            client.del("promos",(err,reply) => {
                if (reply == true) resolve();
                reject();
            })
        })
    
}
