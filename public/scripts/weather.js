angular.module('weatherApp', [])
.controller('location', function($scope, $http){





	$scope.getWeather = function(type){
		// variables showing state of app for DOM elements
		$scope.loading = true;
		$scope.showData = false;
		$scope.error = false;
		// empty location object
		var location = {}
		// If requesting zip code
		if (type == "zip") {
			location.zip = $scope.zipCode;
			$http.post('/weather', location).then(function(response){
				var weatherData = response.data;
				console.log(weatherData);
				if (!weatherData.error) {
					// Success
					$scope.city = weatherData.city;
					$scope.temperature = weatherData.temperature + " &ordm; F";
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
						$scope.temperature = weatherData.temperature + " &ordm; F";
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





});

