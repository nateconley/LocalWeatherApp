var fs = require('fs');

var header = fs.readFileSync('./html/header.html');
var footer = fs.readFileSync('./html/footer.html');

var generator = function(request, response) {
	response.write(header);
	response.end();
}

module.exports.generator = generator;