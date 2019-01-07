//const redis = require("redis");
const mongoose = require('mongoose');
const promos = require('../migrations/PromosArray');
const id = new mongoose.Types.ObjectId("359024423590");
module.exports = {

    setProductos: (promosJson) =>
      new Promise((resolve,reject) => {
        promos.remove({"_id": id}).exec();
        let promociones = new promos({"_id": id});
        JSON.parse(promosJson).promociones.forEach((element) => promociones.promosChildren.push(element));
        promociones.save().then(doc => doc? resolve():reject())
    }),

    getProductos: () =>
      new Promise((resolve,reject) => {
        promos.findOne({"_id": id})
        /*Recordar que las query no son promesas https://mongoosejs.com/docs/promises.html*/
        .then(doc => {
          if(doc){
            let promos = [] 
            doc.promosChildren.forEach((element)=>promos.push({nombre:element.nombre}))
            resolve(JSON.stringify(promos))
          }
          else{
            reject()
          }
        })
      }),
//return resolve(JSON.stringify(doc.promosChildren[])
    cleanCache : () =>
        new Promise((resolve,reject) => {
          promos.remove({"_id": id}).exec()
          .then(resolve()).catch(reject())
        })

}
