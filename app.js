var http = require('http');
var routes = require('./routes');


//Create a server 
var server = http.createServer(function (request, response){
	response.writeHead(200, {'Content-type': 'text/html'});
	routes.page(response);
}); 

//Listen on port 3000
server.listen(3000, function(){
	console.log("server running on port 3000...");
});