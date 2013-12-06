var myApp = /**
* egc Module
*
* Overarching module for the EGC website
*/
angular.module('egc', [ 'ui.router', 'ngRoute']);

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


//News Loading controller
function newsListingControl ($scope, $routeParams, $http) {
	$http.get('js/egc-news.json')
		.success(function(data) {
		$scope.news = data;
	});
}

