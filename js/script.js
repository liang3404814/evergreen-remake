var myApp = /**
* egc Module
*
* Overarching module for the EGC website
*/
angular.module('egc', [ 'ngAnimate', 'ui.router', 'ngRoute', 'Audio5']);

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
		templateUrl: "partials/repertoire.html"
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

function repertoireListingControl ($scope, $routeParams, $http, AudioService) {
	$scope.player = AudioService;

	$http.get('js/egc-repertoire.json').success(function(data) {
		$scope.repertoire = data;
		

		var oldURL;

		// a transparent function that first loads the file, then calls Audio5's playPause method.
		$scope.playPause = function (url) {
			if (!(url === oldURL)) {
				$scope.player.load(url);
				oldURL = url;
			}

			$scope.player.playPause();
		}

		$scope.player.on('timeupdate',function(time, duration){
	        $scope.$apply(function(){
	          $scope.position = time;
	          $scope.duration = duration;
	        });
	    });

	    $scope.player.on('timeupdate',function(){
	      $scope.$apply();
	    })

	});

	
}