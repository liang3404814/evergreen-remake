var myApp = /**
* egc Module
*
* Overarching module for the EGC website
*/
angular.module('egc', [ 'ngAnimate', 'ui.router', 'ui', 'ngRoute', 'audioPlayer', 'angular-parallax', 'ngProgressLite']);

myApp.config(['ngProgressLiteProvider', function (ngProgressLiteProvider) {
			ngProgressLiteProvider.settings.ease = 'ease-in';
					}]);

// Routing Settings
myApp.config(function($stateProvider, $urlRouterProvider) {

	// redirects default landing and non-matched requests to "/" aka home
	$urlRouterProvider.otherwise('/');

	$stateProvider

	.state('home', {
		url: "/",
		templateUrl: "partials/home.html",
		controller: homeControl
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

myApp.run(function($rootScope, ngProgressLite, $timeout) {
	$rootScope.$on('$stateChangeStart', function() {
		ngProgressLite.start();
		ngProgressLite.set(0.4);
		
	})

	$rootScope.$on('$stateChangeSuccess', function() {
		ngProgressLite.done();
	})
});

myApp.directive('clickableProgressbar', ['', function(){
	
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// cont­rol­ler: function($scope, $element, $attrs, $transclue) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			$(iElm).click(function() {
				alert('yeah');
			});
		}
	};
}]);



//News Loading controller
function newsListingControl ($scope, $routeParams, $http) {
	$http.get('js/egc-news.json')
	.success(function(data) {
		$scope.news = data;
	});
}

function repertoireListingControl ($scope, $routeParams, $http) {

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
		audioElement.egc_id = song.id;

		$scope.playlist.push(audioElement);

		if ($scope.playlist.length == 1) {
			$scope.audioPlayer.play(0);
		}

		// console.log($scope.playlist);
	}

	$scope.removeSongFromListByIndex = function(index) {

		if (index === $scope.playlist.length) {
			$scope.audioPlayer.prev();
		} else {
			$scope.audioPlayer.next();
		}

		$scope.audioPlayer.pause();

		$scope.playlist.splice(index, 1);
		// console.log($scope.playlist);
	}


	$http.get('js/egc-repertoire.json').success(function(data) {
		$scope.repertoire = data;
	});

	
}

function eventsListingControl ($scope, $routeParams, $http) {
	$http.get('js/egc-events.json').success(function(data) {
		$scope.events = data;
	});
}

function galleryListingControl ($scope, $routeParams, $http) {
	$http.get('js/egc-gallery.json').success(function(data) {
		$scope.gallery = data;
	});
}

function homeControl ($scope) {
	
}

function navControl ($scope, $location) {
	$scope.collapseNav = true;

	$scope.$on('$stateChangeStart', function () {
		$scope.collapseNav = true;
	});
}