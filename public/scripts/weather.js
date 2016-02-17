angular.module('weatherApp', [])
.controller('location', function($scope, $http){

	// Temperature unit to fahrenheit
	var tempUnit = "F";

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
			if (!location.zip.match(/[0-9]{5}/)) {
				$scope.invalidZip = true;
				$scope.loading = false;
			} else {
				$http.post('/weather', location).then(function(response){
					var weatherData = response.data;
					if (!weatherData.error) {
						// Success
						$scope.city = weatherData.city;
						$scope.temperature = weatherData.temperature + "º " + tempUnit;
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



	}




});

