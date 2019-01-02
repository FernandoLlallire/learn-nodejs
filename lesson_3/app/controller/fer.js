const file = require("../File");

/*Configuracion del archivo de promociones*/
const promoFile = file.logFile("/src/app/config.json");

promoFile.getFileNamePromise()
                .then((fileName) => { 
                    const promoDataFile = file.fileFactory(fileName);
                    promoDataFile.readFile()
                    .then(mensaje => console.log(mensaje))
                })