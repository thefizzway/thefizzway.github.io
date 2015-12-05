app.controller("MainController", function($scope, $location, UnitService){
  $scope.$location = $location;
  UnitService.success(function(data){
    $scope.units = data.units;
  });
});