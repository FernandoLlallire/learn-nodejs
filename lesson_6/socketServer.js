const sio = require('socket.io');
let io = null;


exports.io = ()=>io;
exports.initialize = (server) => io=sio(server);
exports.connect = ()=>{
    const userDisconnected = ()  => console.log('user disconnected');
    io.on('connection', (socket) => {
        socket.on('disconnect', userDisconnected);
        socket.on('chat message', function(msg, username){
          io.emit('chat message', `${username}: ${msg}`);
        });
      });
};


  