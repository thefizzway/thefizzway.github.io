app.controller("NewsController", function($scope){
  $.ajax({
    url:"http://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=http://phys.org/rss-feed/&num=20",
    type:"GET",
    dataType:"jsonp",
    success:function(data){
      $scope.entries = data.responseData.feed.entries;
      $scope.$apply();
    }
  });
});