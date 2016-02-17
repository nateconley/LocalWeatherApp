angular.module('weatherApp', [])
.controller('location', function($scope, $http){

	// Geolocation option
	$scope.geolocation = function(){
		console.log("you have pressed the geolocation button");
		navigator.geolocation.getCurrentPosition(function(position){
			var location = {};
			location.latitude = position.coords.latitude;
			location.longitude = position.coords.longitude;
			console.log(location);
			$http.post('/weather', location).then(function(response){
				var weatherData = response.data;
				$scope.city = weatherData.city;
				$scope.temperature = weatherData.temperature + " &ordm; F";
				$scope.condition = weatherData.condition;
			}, function(){
				console.log("request failed");
			});
		});
	}

	$scope.zip = function(){
		console.log("you have pressed the zip code button");
		var location = {};
		location.zip = $scope.zipCode;
		$http.post('/weather', location).then(function(response){
			console.log(response.data);
		}, function(){
			console.log("request failed");
		});
	}

});