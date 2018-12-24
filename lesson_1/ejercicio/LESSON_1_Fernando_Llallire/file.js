const fs = require('fs');

const  readPromise = (fileName) =>
  new Promise((resolve, reject) => {
    fs.readFile(fileName,'utf8',(err,data) => {
      if(err) return reject(fileName);
      return resolve(fileName);
    })
  })

const createPromise = (fileName, msg = '') =>
  new Promise ((resolve,reject) => {
    fs.writeFile(fileName, msg, 'utf8', (err) => {
      if(err) return reject (err);
      return resolve(fileName);
    })
  })

const appendPromise = (fileName, msg = '') => new Promise((resolve, reject) => {
  fs.appendFile(fileName, msg, 'utf8', (err) => {
    if (err) return reject(err);//Le dejo el reject sin asignar por si quiero asignarle alguna tarea con algun catch.
    return resolve("File Update");
  })
})

readPromise("log.html")
.catch((fileName) => createPromise(fileName))
.then((fileName) => appendPromise(fileName,"texto"));
