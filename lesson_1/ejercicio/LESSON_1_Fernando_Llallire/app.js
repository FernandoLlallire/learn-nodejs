const argv = require('yargs').argv;
const file =  require('./File.js');
const msgs = require('./Msgs.js');
// ejecucion mediante ./app.js --msg="Demo MSG"
const msg = argv.msg;
const messages = msgs.msgFactory();
const logName = file.logFile("config.json");

logName.getFileNamePromise().then((fileName) => {
  messages.concatenate(msg);
  messages.concatenate(new Date().toString());
  const logFile = file.fileFactory(fileName);
  logFile.setMessage(messages.messenger());
  logFile.updateFile();
}
);
