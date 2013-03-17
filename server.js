var app = require('express')()
, server = require('http').createServer(app)
, io = require('socket.io').listen(server);

//Inciando server na porta 3000, utilizando uma função de callback
//para indicar o inicio do servidor
server.listen(3000, function(){
   console.log("Chat real-time...");
});

//Adcionando uma rota com o framework express
app.get('/', function(req, res){
	res.sendfile(__dirname + '/index.html');
});

//Eventos do socket
io.sockets.on('connection', function(socket){

	socket.on('enviarParaServer', function(data){
		var msg = "<b>"+data.nome+": </b>"+data.msg+"<br/>"
		socket.emit('enviarParaCliente', msg);
		socket.broadcast.emit('enviarParaCliente', msg);
	});

});