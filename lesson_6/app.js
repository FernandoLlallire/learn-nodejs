const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const route = require('route/route')
const userDisconnected = ()  => console.log('user disconnected');

io.on('connection', function(socket){

  socket.on('disconnect', userDisconnected);

  socket.on('chat message', function(msg, username){
    io.emit('chat message', `${username}: ${msg}`);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
