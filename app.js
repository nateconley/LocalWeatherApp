var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes');
var weatherApi = require('./weatherApi');

var app = express();

// Accesses post body data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Make html not minified
app.locals.pretty = true;

app.use('/static', express.static(__dirname + '/public'));

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

app.get('/weather', routes.weather);

app.post('/weather', function(req, res){
	weatherApi.apiCall(req.body, res);
});

app.listen(3000, function(){
	console.log("The frontend server is running on port 3000");
});