app.factory("UnitService", function($http){
  return $http.get("data/json/units.json").success(function(data){
    return data;
  }).error(function(err){
    return err;
  });
});