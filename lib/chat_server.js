




var guestNumber = 1;
var nicknames = {}
var rooms = {};
rooms.index = 'index';
rooms.r2 = 'r2'


var socketRooms = {}

var createChat = function(server){
  var io = require('socket.io').listen(server)
  io.sockets.on('connection', function (socket) {

    guestNumber +=1;
    assignTempName(socket);

    //join room
    socket.join(rooms['index'])
    socketRooms[socket.id] = 'index'

    socket.emit('changeNick', { nickName: nicknames[socket.id] })
    socket.on('changeNick', function(data){

      nicknames[socket.id] = data.nickName
    })

    socket.on('changeRoom', function(data){
      changeRoom(socket, data.room)
    })

    socket.on('printRooms', function(){
      printRooms();
    })

    socket.on('disconnect', function(){
      io.sockets.emit('userLeft', {user: nicknames[socket.id] });
      delete nicknames[socket.id];
    })

    socket.on('message', function (chatMessage) {
      io.sockets.in(socketRooms[socket.id]).emit('sendMessage', {text: chatMessage.text,
        nickname: nicknames[socket.id]} )


    });
  });
}


var assignTempName = function(socket){
  nicknames[socket.id] = "Guest" + (guestNumber - 1)
}

var changeRoom = function(socket, room){
  if (rooms[room]){
    socket.join(room);
  } else {
    rooms[room] = room;
    socket.join(room);
  }

  socketRooms[socket.id] = room
}

var printRooms = function(){
  console.log('ajdfakjsdhfkjasdhfakjsdfhalsdkfjalkjd')

}

exports.createChat = createChat