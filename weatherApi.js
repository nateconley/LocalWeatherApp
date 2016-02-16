var request = require('request');

//API call 
var apiCall = function(location) {
	var url = "http://api.openweathermap.org/data/2.5/weather";
	var appid = "&units=imperial&appid=6b89f8f900eaa2da365dfe67bda5b1a2";
	
	if (location.zip) {
		url += "?zip=" + location.zip + ",us" + appid;
	} else {
		url += "?lat=" + location.latitude + "&lon=" + location.longitude + appid; 
	}

	request(url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    var content = JSON.parse(body);
	    var city = content.name + ", " + content.sys.country;
	    var temperature = Math.round(content.main.temp);
	    var condition = content.weather[0].description.toLowerCase();

	    console.log("The temperature for " + city + " is " + temperature + "F and the condition is: " + condition);

	  } else if (error) {
	  	console.log("there was an error");
	  }
	});
}

//export the weather api call
module.exports.apiCall = apiCall;