var myApp = /**
* egc Module
*
* Overarching module for the EGC website
*/
angular.module('egc', [ 'ngAnimate', 'ui.router', 'ui', 'ngRoute', 'audioPlayer']);

// Routing Settings
myApp.config(function($stateProvider, $urlRouterProvider) {

	// redirects default landing and non-matched requests to "/" aka home
	$urlRouterProvider.otherwise('/');

	$stateProvider

	.state('home', {
		url: "/",
		templateUrl: "partials/home.html"
	})
	.state('about', {
		url: "/about",
		templateUrl: "partials/about.html"
	})
	.state('news', {
		url: "/news",
		templateUrl: "partials/news.html"
	})
	.state('repertoire', {
		url: "/repertoire",
		templateUrl: "partials/repertoire.html",
		controller: repertoireListingControl
	})
	.state('events', {
		url: "/events",
		templateUrl: "partials/events.html"
	})
	.state('gallery', {
		url: "/gallery",
		templateUrl: "partials/gallery.html"
	})
	.state('contact', {
		url: "/contact",
		templateUrl: "partials/contact.html"
	})
});

// Setting up mediaelement player directive
// myApp.directive('mediaelement', function() {
// 	return {
// 		restrict: 'A',
// 		link: function(scope, element, attrs) {
// 			attrs.$observe('src', function() {
// 				element.mediaelementplayer();
// 			});
// 		}
// 	}
// });



//News Loading controller
function newsListingControl ($scope, $routeParams, $http) {
	$http.get('js/egc-news.json')
		.success(function(data) {
		$scope.news = data;
	});
}

function repertoireListingControl ($scope, $routeParams, $http) {
	// $scope.player = AudioService;

	// for sticky waypoints parameter evaluation
	$scope.sticky = 
		"sticky", 
		{wrapper : '<div class="sticky-wrapper row" />'};
	 

	$scope.playlist = [];

	$scope.addSong = function(song) {
		var audioElement = {};
		audioElement.src = song.audioURL;
		audioElement.type = 'audio/mp3';
		audioElement.title = song.title;
		audioElement.description = song.description;

		$scope.playlist.push(audioElement);
		console.log($scope.playlist);
	}


	$http.get('js/egc-repertoire.json').success(function(data) {
		$scope.repertoire = data;
	});

	
}

function galleryListingControl ($scope, $routeParams, $http) {
	$http.get('js/egc-gallery.json')
		.success(function(data) {
			$scope.gallery = data;
		});
}