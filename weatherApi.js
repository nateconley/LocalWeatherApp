var request = require('request');

//Location object for testing (delete later)
var location = {
	///zip: "93611",
	latitude: "36.83",
	longitude: "-119.7"
}

//API call 
var apiCall = function(location) {
	var url = "http://api.openweathermap.org/data/2.5/weather";
	var appid = "&appid=6b89f8f900eaa2da365dfe67bda5b1a2";
	
	if (location.zip) {
		url += "?zip=" + location.zip + ",us" + appid;
	} else {
		url += "?lat=" + location.latitude + "&lon=" + location.longitude + appid; 
	}

	request(url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    console.log(body);
	  } else if (error) {
	  	console.log("there was an error");
	  }
	});
}

apiCall(location);

//export the weather api call
module.exports.apiCall = apiCall;