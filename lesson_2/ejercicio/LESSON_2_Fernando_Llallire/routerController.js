const uuid4 = require("uuid4");
const file =  require('./File.js');
const msgs = require('./Msgs.js');

const id = uuid4();
const messages = msgs.msgFactory();
const logName = file.logFile("config.json");
module.exports = {
    addMsg : (req,res,next) => {
        if(!req.query.msg){
            return res.status(404).render("Ingrese el mensaje con el siguiente formato \"localhost:8000?msg=MensajeParaGuardar\"");
        }
        logName.getFileNamePromise().then((fileName) => {
            messages.concatenate(id,req.query.msg);
            const logFileToEdit = file.fileFactory(fileName);
            logFileToEdit.setMessage(messages.messenger());
            logFileToEdit.updateLog()
            })
        /*.then((fileName) => {
            logFile.updateFile();
          })*/
          res.send("Log file update with the new object")
        }
}