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

const writePromise = (proto) =>
  new Promise((resolve, reject) => {
    if(!proto.hasOwnProperty("objElement")){
      proto.objElement = [proto.msg];
    }else{
      proto.objElement.push(proto.msg);
    }
    fs.writeFile(proto.logFile, JSON.stringify(proto.objElement), (err) => {
      if(err) return reject(err);
      return resolve("Log file update with the new object");
    })
  })

const  readPromise = (proto) =>
  new Promise((resolve, reject) => {
    fs.readFile(proto.jsonFileName,'utf8',(err,data) => {
      if(err) return reject(err);
      return resolve(data);
    })
  })

  const  readLogPromise = (proto) =>
  new Promise((resolve, reject) => {
    fs.readFile(proto.logFile,'utf8',(err,data) => {
      if(err) return reject(err);
      if(data){
        proto.objElement = JSON.parse(data);
      }
      return resolve(proto);
    })
  })

  const  readFilePromise = (proto) =>
  new Promise((resolve, reject) => {
    fs.readFile(proto.logFile,'utf8',(err,data) => {
      if(err) return reject(err);
      return resolve(data);
    })
  })
/******************************************************************************/
const readFile = (proto) => ({
  readFile : () => readFilePromise(proto)
  .then(data => JSON.stringify(data))
})

const updateFile = (proto) =>({
  updateFile : () => openPromise(proto)
  .catch((data)=>createPromise(data))
  .then((data)=>appendPromise(data))
  .then((status) => console.log(status))
})

const updateLog = (proto) => ({
  updateLog : () => openPromise(proto)
  .catch((proto) => createPromise(proto))
  .then((proto) => readLogPromise(proto))
  .then((proto) => writePromise(proto))
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
  let proto = {
    logFile
  }
  return Object.assign(
    proto,
    updateFile(proto),
    setJsonFile(proto),
    setMessage(proto),
    updateLog(proto),
    readFile(proto)
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
