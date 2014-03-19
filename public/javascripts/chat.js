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

    this.socket.emit('changeNick', {nickName: txt} )
  }



})(this);