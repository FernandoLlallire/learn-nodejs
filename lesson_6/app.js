const app = require('express')();
const http = require('http').Server(app);
const route = require('./route/route');
const io = require('./socketServer');

app.use('/', route);
app.get('*', (req,res) => res.send("Lesson 6 => localhost:3000/chat"));
io.initialize(http);
io.connect();

http.listen(3000, function(){
  console.log('listening on *:3000');
});
