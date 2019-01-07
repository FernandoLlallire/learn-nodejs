//const redis = require("redis");
const promos = require('../migrations/PromosArray');
let promociones = new promos;

module.exports = {

    setProductos: (promosJson) =>
      new Promise((resolve,reject) => {
        JSON.parse(promosJson).promociones.forEach((element) => promociones.promosChildren.push(element))
        promociones.save((err,product) => {
          console.log(product)
          if(err) reject();
          resolve();
        })
    }),

    getProductos: () =>
      new Promise((resolve,reject) => {
        promociones.find({}).populate('promosChildren').exec((err,promos) => {console.log(promos); return promos})
        //   (err,doc) => {
        //   if(err) reject();
        //   console.log("el resultado de get producto es : \n"+ doc)
        //   resolve(JSON.parse(doc))
        // })
      }),

    cleanCache : () =>
        new Promise((resolve,reject) => {
          console.log(promociones)
          promociones.promosChildren.remove();
          console.log(promociones)
          promociones.save((err,product) => {
            if(err) reject();
            resolve();
          })
        })

}
