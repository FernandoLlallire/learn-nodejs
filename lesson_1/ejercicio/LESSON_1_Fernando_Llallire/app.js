const argv = require('yargs').argv;
const file =  require('./File.js');
const msgs = require('./Msgs.js');
// ejecucion mediante ./app.js --msg="Demo MSG"
const msg = argv.msg;
const messages = msgs.msgFactory();
const logFile = file.fileFactory("config.json");
messages.concatenate(msg);
messages.concatenate(new Date().toString());
logFile.obtainLogFileName();
logFile.setMessage(messages.messenger());
logFile.updateFile();
