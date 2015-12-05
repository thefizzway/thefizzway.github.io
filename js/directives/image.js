app.directive("blockImage", function($window){
  return {
   restrict:"E",
   templateUrl:"js/templates/image.html",
    controller: function($scope, $window) {
       $scope.window = function(src) {
           $window.open(src);
       }
    },
   scope:
   {
        src:'@source'
   }
  };
});