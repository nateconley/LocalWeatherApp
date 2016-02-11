var fs = require('fs');

var header = fs.readFileSync('./html/header.html');
var footer = fs.readFileSync('./html/footer.html');

var page = function(response) {
	response.write(header);
	response.write(footer);
	response.end();
}

module.exports.page = page;

if()