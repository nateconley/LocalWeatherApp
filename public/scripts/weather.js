angular.module('weatherApp', [])
.controller('location', function($scope, $http){
	$scope.geolocation = function(){
		console.log("you have pressed the geolocation button");
		navigator.geolocation.getCurrentPosition(function(position){
			var location = {};
			location.latitude = position.coords.latitude;
			location.longitude = position.coords.longitude;
			console.log(location);
			$http.post('/', location);
		});
	}

	$scope.zip = function(){
		console.log("you have pressed the zip code button");
		console.log();
	}

});