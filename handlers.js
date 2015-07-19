var path = require('path');
var qs = require('querystring');
var fs = require('fs');

var Handlers = {
	getContentType: function (filename) {
		var ext = path.extname(filename).toLowerCase();
		switch (ext){
			case '.js': return 'application/javascript';
			case '.css': return 'text/css';
			case '.html': return 'text/html';
			default: return 'text/plain';
		}
	},
	post: function (req, res) {
		console.log(req.method);
		var formData = '';
		
		req.on('readable', function () {
			var data = req.read();
			console.log(data);
			if(typeof data == 'string'){
				formData += data;
			}
			else if(typeof data == 'object' && data instanceof Buffer){
				formData += data.toString('utf8');
			}

		});

		req.on('end', function () {
			fs.writeFile('sandwich.json', formData);
			console.log(formData);
			res.end(formData);
		});
	}
};

module.exports = Handlers;