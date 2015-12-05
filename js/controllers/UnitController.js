app.controller("UnitController", function($scope, $routeParams, $sce, UnitService, $location, $http){
  $scope.unit = $routeParams.unit;
  $scope.$location = $location;
  $scope.like = "like";
  var api = "https://script.google.com/macros/s/AKfycbx_WvKwX7XNDwY_enz-7K8JwfNy-aK3aYFi6Bm-YUazcFsPdAI/exec?request=";
  
  if(localStorage["likes"] && JSON.parse(localStorage["likes"]).length > 0 && JSON.parse(localStorage["likes"]).indexOf($scope.unit) > -1){
    $scope.like = "liked";
  }
  
  var request = JSON.stringify({"method":"like","action":"getlikecount","unit":$scope.unit});
  $http.get(api + request).success(function(response){
    $scope.likecount = response.likes;
  });
    
  UnitService.success(function(data){
    if(data.units.length < $scope.unit){
      location.href="#/unit/" + ($scope.unit-1);
    }
    var unit = data.units[$scope.unit - 1];
    $scope.title = unit.title;
    $scope.content = unit.content;
    $scope.images = unit.images;
    $scope.links = unit.links;
    $scope.content = $sce.trustAsHtml($scope.content);
    
  });
  
  $scope.read = function(){
    setInterval(function(){
      if(speechSynthesis.speaking){
        $("#reading").text("STOP READING");
        $(".fa-volume-up").addClass("fa-volume-off").removeClass("fa-volume-up");
      }
      else{
        $("#reading").text("READ IT OUT");
        $(".fa-volume-off").addClass("fa-volume-up").removeClass("fa-volume-off");
      }
    }, 1000);
    
    if(!speechSynthesis.speaking){
      var text = $("#textualContent p").text();
      var msg = new SpeechSynthesisUtterance();
      msg.text = text;
      msg.lang = 'en-US';
      speechSynthesis.speak(msg);
    }
    else{
      speechSynthesis.cancel();
    }
  };
  
  $scope.toggleLike = function(){
    var request = JSON.stringify({"method":"like","action":"like","unit":$scope.unit});
    $http.get(api + request).success(function(response){
      $scope.likecount = response.likes;
      var likes = localStorage["likes"]?JSON.parse(localStorage["likes"]):[];
      likes.push($scope.unit);
      localStorage["likes"] = JSON.stringify(likes);
      $scope.like = "liked";
    });
    
  };
  
  //SET animations
  $(document).ready(function(){
    $(window).scroll(function(e){
      var percentageScrolled = $(document).scrollTop()/($(document).height() - $(window).height());
      $("#imageStrip").css("opacity", 1-percentageScrolled);
    });
  });
  
  
});