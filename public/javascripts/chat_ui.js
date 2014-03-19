

$(document).ready(function(){
  var socket = io.connect();
  var chat = new ChatApp.Chat(socket)
  $('#send-message').on('submit', function(event){
    event.preventDefault();
    var txt = $('input.bla').val();
    if (txt[0]==="/"){
      var newName = (txt.substring(txt.indexOf(' ')+1))
      chat.processCmd(newName)
    } else{
      chat.sendMessage(txt)
    }

    $('input.bla').val('')

  });







  chat.socket.on('sendMessage', function(data){
    var msg = $('<p>');
    msg.html(data.nickname+ ": " + data.text)
    $('div.messages').append(msg)

  })

  chat.socket.on('userLeft', function(data){
    var msg = $('<p>');
    msg.html(data.user + ' has left the room')
    $('div.messages').append(msg)

  })

});