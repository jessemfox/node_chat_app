








var createChat = function(server){
  var io = require('socket.io').listen(server)
  io.sockets.on('connection', function (socket) {
    socket.on('message', function (chatMessage) {
      io.sockets.emit('sendMessage', chatMessage)
    });
  });
}

exports.createChat = createChat