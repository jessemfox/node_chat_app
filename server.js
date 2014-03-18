var static =require('node-static');

var chat_server = require('./lib/chat_server').createChat;

var file = new static.Server('./public')

var app = require('http').createServer(function(req, res){
  req.addListener('end', function(){

    //serve files here
    file.serve(req, res)


  }).resume();


}).listen(8080);

console.log('Server running at http://127.0.0.1:8080/');

//app.listen(8080);

function handler(req, res) {

  fs.readFile(__dirname + '/public/index.html',
  function(err, data){
    if (err){
      res.writeHead(500);
      return res.end('Error loading page')
    }
    res.writeHead(200);
    res.end(data);
  });

}

chat_server(app)
