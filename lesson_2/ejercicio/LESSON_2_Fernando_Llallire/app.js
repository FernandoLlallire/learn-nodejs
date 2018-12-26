const express = require("express");
const port = 8000;
let app = express();
const router = express.Router();

const idMiddleware = (req, res, next) => {
  res.send("entro al controller");
  next();
};
const idController = (req,res) => {
 res.send("entro al controller");
};
router.use("/", idMiddleware);
router.get("/",idController);
app.listen(8000, () => (console.log("Server on localhost:"+port)));

/*const argv = require('yargs').argv;
const file =  require('./File.js');
const msgs = require('./Msgs.js');
const express = require("express");
const port = 8000;
// ejecucion mediante ./app.js --msg="Demo MSG"
let app = express();

const msg = argv.msg;
const messages = msgs.msgFactory();
const logName = file.logFile("config.json");

const router = express.Router();
router.use("/", idMiddleware);

const idMiddleware = (req, res, next) => {
  res.locals.id = req.param.id;
  next();
};

app.listenerCount(8000, () => (console.log("Server on localhost:"+port)));

router.get("/:id",idController);
const idController = (req,res) => {

};
  logName.getFileNamePromise().then((fileName) => {
  messages.concatenate(msg);
  messages.concatenate(new Date().toString());
  const logFile = file.fileFactory(fileName);
  logFile.setMessage(messages.messenger());
  logFile.updateFile();
}
);*/
