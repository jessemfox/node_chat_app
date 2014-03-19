(function(root){

  var ChatApp = root.ChatApp = (root.ChatApp || {})

  var Chat = ChatApp.Chat = function(socket){
    this.socket = socket;
    this.nickname = '';
  };

  Chat.prototype.sendMessage = function(messageText){
    this.socket.emit('message', {text: messageText})

  }

  Chat.prototype.processCmd = function(txt){
    var cmd = txt.substring(1, txt.indexOf(' '));
    var instruction = (txt.substring(txt.indexOf(' ')+1));
    if (cmd==='nick'){
      this.socket.emit('changeNick', {nickName: instruction} )
    } else if (cmd === 'change'){
      this.socket.emit('changeRoom', {room: instruction})
    } else if (cmd === 'rooms') {

      this.socket.emit('printRooms', {})
    }

  }



})(this);