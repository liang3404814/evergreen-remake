'use strict';

angular.module('angular-parallax', [
]).directive('parallax', function($window) {
  return {
    restrict: 'A',
    scope: {
      parallaxRatio: '=',
      parallaxVerticalOffset: '=',
      parallaxHorizontalOffset: '=',
    },
    link: function($scope, elem, $attrs) {
      var setPosition = function () {
        elem.css('left', $scope.parallaxHorizontalOffset);       
        
        var calcValY = $window.pageYOffset * $scope.parallaxRatio;
        if (calcValY <= $window.innerHeight)
          elem.css('top', (calcValY < $scope.parallaxVerticalOffset ? $scope.parallaxVerticalOffset : calcValY));       
      }

      setPosition();

      if($scope.parallaxRatio) {
        setPosition();
        angular.element($window).bind("scroll", setPosition);
      }
    }  // link function
  };
}).directive('parallaxBackground', function($window) {
  return {
    restrict: 'A',
    transclude: true,
    template: '<div ng-transclude>' +
              '</div>',
    scope: {
      parallaxRatio: '=',
    },
    link: function($scope, elem, attrs) {
      var setPosition = function () {
        elem.css('background-position-x', "50%");       
        elem.css('background-position-y', (elem.prop('offsetTop') - $window.pageYOffset) * $scope.parallaxRatio - 100 + "px");       
      }

      if($scope.parallaxRatio) {
        setPosition();
        angular.element($window).bind("scroll", setPosition);
      }
    }  // link function
  };
}).directive('brightnessGradient', function($window) {
  return {
    restrict: 'A',
    transclude: false,
    // template: '<div ng-transclude>' +
    //           '</div>',
    scope: {
      bChangeRatio: '=',
      from: '@',
    },
    link: function($scope, elem, attrs) {
      var setBrightness = function() {
        elem.css('-webkit-backface-visibility', "hidden");

        var value;

        if ($scope.from === 'bright') {
          value = Math.max(100 - ($window.pageYOffset ) / (elem.prop('offsetTop')) * $scope.bChangeRatio * 100, 0);
        } else {
          value = Math.min(Math.abs(($window.pageYOffset) / (elem.prop('offsetTop')) * $scope.bChangeRatio * -100),
                            100);
        }
        //console.log("brightness(" + value + "%)");
        console.log("ost: " + elem.prop('offsetTop'));
        console.log("pageYOffset: " + $window.pageYOffset);
        console.log("value:   " + value)
        
        elem.css('-webkit-filter', "brightness(" + value + "%)");
      }

      if($scope.bChangeRatio) {
        setBrightness();
        angular.element($window).bind("scroll", setBrightness);
      }
    }
  }
});
