app.controller("NewsController", function($scope){
  $.ajax({
    url:"https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fphys.org%2Frss-feed%2F",
    type:"GET",
    dataType:"jsonp",
    success:function(data){
      $scope.entries = data.items;
      $scope.$apply();
    }
  });
});