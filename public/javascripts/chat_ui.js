(function(root){
  var ChatApp = root.ChatApp = (root.ChatApp || {});
  var socket = io.connect();

  var ChatUi = ChatApp.ChatUi = function(){
    chat: new ChatApp.Chat(socket)
  };

  ChatUi.prototype.getInput = function(){
    return $('input').val()
  };

  ChatUi.prototype.sendMessage = function(){
    this.chat.sendMessage(this.getInput)
  };


})(this);

$(document).ready(function(){
  var socket = io.connect();
  var chat = new ChatApp.Chat(socket)
  $('#send-message').on('submit', function(event){
    event.preventDefault();
    console.log(chat.socket)
    chat.sendMessage($('input.bla').val())
  })

  chat.socket.on('sendMessage', function(data){
    var msg = $('<p>');
    msg.html(data.text)
    $('div.messages').append(msg)

  })

});