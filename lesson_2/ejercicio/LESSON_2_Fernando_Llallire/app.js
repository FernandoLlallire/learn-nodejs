
const express = require('express');
const routes = require("./routes");
const port = 8000;
let app = express();

app.use("/",routes)
app.listen(8000, () => (console.log("Server on localhost:"+port)));

/*
// ejecucion mediante ./app.js --msg="Demo MSG"

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
