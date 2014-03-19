




var guestNumber = 1;
var nicknames = {}
var rooms = {}


var createChat = function(server){
  var io = require('socket.io').listen(server)
  io.sockets.on('connection', function (socket) {

    guestNumber +=1;
    assignTempName(socket);
    socket.emit('changeNick', { nickName: nicknames[socket.id] })
    socket.on('changeNick', function(data){

      nicknames[socket.id] = data.nickName
    })

    socket.on('disconnect', function(){
      io.sockets.emit('userLeft', {user: nicknames[socket.id] });
      delete nicknames[socket.id];
    })

    socket.on('message', function (chatMessage) {
      io.sockets.emit('sendMessage', {text: chatMessage.text,
        nickname: nicknames[socket.id]} )


    });
  });
}


var assignTempName = function(socket){
  nicknames[socket.id] = "Guest" + (guestNumber - 1)
}


exports.createChat = createChat