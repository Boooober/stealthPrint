var http = require('http');
var fs = require('fs');
var path = require('path');

var host = '127.0.0.1';
var port = Number(process.env.PORT || 5000);
var Handlers = require('./handlers');

// console.log(JSON.parse(friends));
// fs.writeFileSync('./friends.js', 'var friends = '+JSON.stringify(Data.friends));

var server = http.createServer(function (req, res) {
	// body...
	console.log('Request: ', req.method, req.url);

	if(req.method == 'POST'){
		Handlers.post(req, res);
	} else {
		fs.readFile('.'+req.url, function(err, data){
			var fn = req.url.replace('/','');

			if (err) {
				res.writeHead(404, {'Content-type':'text/plain'});
				res.end('Ooops!');
			}else{

				res.writeHead(200, {'Content-type': Handlers.getContentType(fn)});
				res.end(data);
			}
		});/*readFile*/
	}
})

server.listen(port, function () {
	console.log('listening: //'+host+':'+port);
})