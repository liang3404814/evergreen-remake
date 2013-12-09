angular.module('Audio5').directive('audio', function(AudioService){
  return {
    restrict: 'EA',
    controller: function($scope, $element, $attrs, $transclude) {
      $scope.player = AudioService;

      $scope.player.on('timeupdate',function(time, duration){
        $scope.$apply(function(){
          $scope.position = time;
          $scope.duration = duration;
        });
      });

      link: function($scope, element, attrs) {
        $scope.player.load(song.audioURL);
      }
    }
  }
});
