var request = require('request');

//API call 
var apiCall = function(location, res) {
	var url = "http://api.openweathermap.org/data/2.5/weather";
	var appid = "&units=imperial&appid=6b89f8f900eaa2da365dfe67bda5b1a2";
	
	if (location.zip) {
		url += "?zip=" + location.zip + ",us" + appid;
	} else {
		url += "?lat=" + location.latitude + "&lon=" + location.longitude + appid; 
	}

	request(url, function (error, response, body) {
		var weatherData = {};
	  if (!error && response.statusCode == 200) {
	    var content = JSON.parse(body);
	    if(content.cod == 200) {	// Check api json for error code
		    weatherData.city = content.name + ", " + content.sys.country;
		    weatherData.temperature = Math.round(content.main.temp);	// Defaults to fahrenheit
		    weatherData.condition = content.weather[0].description;
		  } else {
		  	weatherData.error = true;	// return error
		  }
	  } else {
	  	weatherData.error = true;	// return error
	  }
	  
	  res.json(weatherData);
	});
}

//export the weather api call
module.exports.apiCall = apiCall;