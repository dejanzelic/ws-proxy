var net = require('net');
var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function (request, response) {
});
server.listen(8080, function () { });

// create the server
wsServer = new WebSocketServer({
	httpServer: server
});

wsServer.on('request', function (request) {
	console.log('Connected to Web Socket');
	var wsConnection = request.accept(null, request.origin);
	var socketClient = new net.Socket();

	socketClient.connect(process.env.TCP_PORT, process.env.TCP_HOST, function () {
		console.log('Connected to TCP Socket');
	});

	socketClient.on('data', function (data) {
		console.log('Received message from TCP Socket');
		console.log('Sending message to Web Socket');
		wsConnection.sendUTF(data);
	});

	wsConnection.on('message', function (message) {
		console.log('Received message from Web Socket');
		req = message.utf8Data + "\n"
		if (message.type === 'utf8') {
			console.log('Sending Message to TCP Socket');
			socketClient.write(req);
		}
	})

	wsConnection.on('close', function (wsConnection) {
		console.log('Closing Connection from Web Socket');
		socketClient.destroy(); // kill client after server's response
	});

	socketClient.on('close', function () {
		console.log('TCP Socket Connection closed');
		wsConnection.close()
	});
});

