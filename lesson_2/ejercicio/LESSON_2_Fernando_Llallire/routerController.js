const uuid4 = require("uuid4");
const file =  require('./File.js');
const msgs = require('./Msgs.js');

const messages = msgs.msgFactory();
const logName = file.logFile("config.json");
module.exports = {
    addMsg : (req,res,next) => {
        if(!req.query.msg){
            return res.status(404).send("Ingrese el mensaje con el siguiente formato \"localhost:8000?msg=MensajeParaGuardar\"");
        }
        logName.getFileNamePromise().then((fileName) => {
            messages.concatenate( uuid4(),req.query.msg);//la idea es que se cree un nuevo usuario por cada uso, si no solo lo defino al logear user
            const logFileToEdit = file.fileFactory(fileName);
            logFileToEdit.setMessage(messages.messenger());
            logFileToEdit.updateLog()
            })
          res.send("Log file update with the new object")
        }
}
