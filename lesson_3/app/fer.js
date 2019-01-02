const file = require("./File");

/*Configuracion del archivo de promociones*/
const promoFile = file.logFile("config.json");

promoFile.getFileNamePromise()
                .then((fileName) => { 
                    const promoDataFile = file.fileFactory(fileName);
                    promoDataFile.readFile()
                    .then(mensaje => console.log(mensaje))
                })