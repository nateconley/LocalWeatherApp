angular.module('weatherApp', [])
.controller('location', function($scope){
	$scope.geolocation = function(){
		console.log("you have pressed the geolocation button");
		navigator.geolocation.getCurrentPosition(function(position){
			var location = {};
			location.latitude = position.coords.latitude;
			location.longitude = position.coords.longitude;
			console.log(location);
		});

	};
});