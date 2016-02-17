angular.module('weatherApp', [])
.controller('location', function($scope, $http){
	// Temperature unit button classes
	$scope.fahrenheitClass = "btn btn-primary";
	$scope.celciusClass = "btn btn default";

	// Temperature unit to fahrenheit
	var tempUnit = "F";
	// Set Temperature for manipulating when unit is changed
	var temp;

	// handles weather requests
	$scope.getWeather = function(type){
		// variables showing state of app for DOM elements
		$scope.loading = true;
		$scope.showData = false;
		$scope.error = false;
		$scope.invalidZip = false;
		// empty location object
		var location = {}
		// If requesting zip code
		if (type == "zip") {
			location.zip = $scope.zipCode;
			// Check if zip is valid (eg: 55555)
			if (!location.zip.match(/[0-9]{5}/) || location.zip.length !== 5) {
				$scope.invalidZip = true;
				$scope.loading = false;
			} else {
				$http.post('/weather', location).then(function(response){
					var weatherData = response.data;
					if (!weatherData.error) {
						// Success
						$scope.city = weatherData.city;
						$scope.temperature = weatherData.temperature + "º " + tempUnit;
						temp = weatherData.temperature;
						$scope.condition = weatherData.condition;
						// Hide Loading Bar and show Data
						$scope.loading = false;
						$scope.showData = true;
					} else {
						// Failure
						$scope.error = true;
						$scope.loading = false;
						$scope.showData = false;
					}
				}, function(){
					// Failure
					$scope.error = true;
					$scope.loading = false;
					$scope.showData = false;
				});
			}
		} else if (type == "geo") {
			// If requesting geoLocation
			navigator.geolocation.getCurrentPosition(function(position){
				var location = {};
				location.latitude = position.coords.latitude;
				location.longitude = position.coords.longitude;
				// http post function
				$http.post('/weather', location).then(function(response){
					var weatherData = response.data;
					if (!weatherData.error) {
						// Success
						$scope.city = weatherData.city;
						$scope.temperature = weatherData.temperature + "º " + tempUnit;
						temp = weatherData.temperature;
						$scope.condition = weatherData.condition;
						// Hide Loading Bar and show Data
						$scope.loading = false;
						$scope.showData = true;
					} else {
						// Failure
						$scope.error = true;
						$scope.loading = false;
						$scope.showData = false;
					}
				}, function(){
					// Failure
					$scope.error = true;
					$scope.loading = false;
					$scope.showData = false;
				});
			});
		}
	}

	$scope.changeUnit = function(unit){

		// Change button class for selected button
		if (unit == "fahrenheit") {
			// Change button class for selected button
			$scope.fahrenheitClass = "btn btn-primary";
			$scope.celciusClass = "btn btn default";
			if (tempUnit == "C"){
				tempUnit = "F";
				$scope.temperature = temp + "º " + tempUnit;
			}

		} else if (unit == "celcius") {
			// Change button class for selected button
			$scope.fahrenheitClass = "btn btn-default";
			$scope.celciusClass = "btn btn-primary";
			if (tempUnit == "F"){
				var tempCelcius = (temp - 32) * 0.555555555;
				tempCelcius = Math.round(tempCelcius);
				tempUnit = "C";
				$scope.temperature = tempCelcius + "º " + tempUnit;
			}	
		}
	}

});

