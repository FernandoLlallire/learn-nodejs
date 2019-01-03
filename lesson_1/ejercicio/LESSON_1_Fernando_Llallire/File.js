const fs = require('fs');

const  openPromise = (proto) =>
  new Promise((resolve, reject) => {
    fs.readFile(proto.logFile,'utf8',(err,data) => {
      if(err) return reject(proto);
      return resolve(proto);
    })
  })

const createPromise = (proto) =>
  new Promise ((resolve,reject) => {
    fs.writeFile(proto.logFile, '', 'utf8', (err) => {
      if(err) return reject (err);
      return resolve(proto);
    })
  })

const appendPromise = (proto) =>
 new Promise((resolve, reject) => {
  fs.appendFile(proto.logFile, proto.msg, 'utf8', (err) => {
    if (err) return reject(err);//Le dejo el reject sin asignar por si quiero asignarle alguna tarea con algun catch.
    return resolve("File Update");
  })
})
const  readPromise = (proto) =>
  new Promise((resolve, reject) => {
    fs.readFile(proto.jsonFileName,'utf8',(err,data) => {
      if(err) return reject(err);
      return resolve(data);
    })
  })
/******************************************************************************/


const updateFile = (proto) =>({
  updateFile : () => openPromise(proto)
  .catch((data)=>createPromise(data))
  .then((data)=>appendPromise(data))
  .then((status) => console.log(status))
})

const getFileNamePromise = (proto) =>({
  getFileNamePromise : () => readPromise(proto)
  .then((jsonData) => JSON.parse(jsonData).nombre)
})


const setJsonFile = (proto) => ({
  setJsonFile : (fileName) => {proto.jsonFileName = fileName}
})

const setMessage = (proto) => ({
  setMessage : (message) => {proto.msg = message}
})

const readFileName = (proto) => ({
  readFileName : (jsonFile) => {
    proto.jsonfile = jsonFile;
    openPromise(proto)
  }
})

const fileFactory = (logFile) => {
  const proto = {
    logFile
  }
  // console.log(proto)
  return Object.assign(
    {},
    updateFile(proto),
    setJsonFile(proto),
    setMessage(proto)
  )
}

const logFile = (jsonFileName) => {
  const proto = {
    jsonFileName
  }
  return Object.assign(
    proto,
    getFileNamePromise(proto)
  )
}
exports.fileFactory = fileFactory;
exports.logFile = logFile;
