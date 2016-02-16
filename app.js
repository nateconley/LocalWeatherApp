// var http = require('http');
// var routes = require('./routes');


// //Create a server 
// var server = http.createServer(function (request, response){
// 	response.writeHead(200, {'Content-type': 'text/html'});
// 	routes.generator(request, response);
// 	if (request.method.toLowerCase() == "post") {
// 		request.on('data', function (data) {
// 			console.log("hello world");
// 		});
// 	}
// }); 

// //Listen on port 3000
// server.listen(3000, function(){
// 	console.log("server running on port 3000...");
// });
var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes');

var app = express();

// Accesses post body data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/static', express.static(__dirname + '/public'));

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

app.get('/', routes.weather);

app.post('/', function(req, res){
	console.log(req.body);
});

app.listen(3000, function(){
	console.log("The frontend server is running on port 3000");
});