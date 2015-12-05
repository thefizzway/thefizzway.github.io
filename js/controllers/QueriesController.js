app.controller("QueriesController", function($scope, $http){
  
  var api = "https://script.google.com/macros/s/AKfycbx_WvKwX7XNDwY_enz-7K8JwfNy-aK3aYFi6Bm-YUazcFsPdAI/exec?request=";
  var i = 0, x="";
  $scope.loading = false;
  if(localStorage.questions === undefined || localStorage.questions ===null){
    localStorage.questions = '[]';
  }
  var success = function(result){
    if(result.answer){
      $scope.questions.push({question:x, answer:result.answer});
    }
    else{
      $scope.questions.push({question:x, answer:"This question hasn't been answered yet. Please check back later. "});
    }
    i += 1;
    if(i >= JSON.parse(localStorage["questions"]).length)
    {
      $("#loading").hide();
      $scope.loading = false;
    }
    else
    {
      x = JSON.parse(localStorage["questions"])[JSON.parse(localStorage["questions"]).length - i - 1];
      var request = JSON.stringify({"method":"queries","action":"get","query":x});
      $http.get(api + request).success(success);
    }
  };
  
  $scope.refresh = function(){
    $("#loading").show();
    $scope.loading = true;
    $scope.questions = [];
    if(JSON.parse(localStorage["questions"]).length > 0){
      i=0;
      x = JSON.parse(localStorage["questions"])[JSON.parse(localStorage["questions"]).length - i - 1];
      var request = JSON.stringify({"method":"queries","action":"get","query":x});
      $http.get(api + request).success(success);
    }
    else{
      $("#loading").hide();
      $scope.loading = false;
    }
    
  };
  
  $scope.insert = function(query){
    var request = JSON.stringify({"method":"queries","action":"insert","query":query});
    $http.get(api + request).success(function(){
      if(localStorage["questions"])
      {
        var temp_questions = JSON.parse(localStorage["questions"]);
        temp_questions.push(query);
        localStorage["questions"] = JSON.stringify(temp_questions);
      }
      else{
        localStorage["questions"] = JSON.stringify([query]);
      }
      $scope.refresh();
    });
  };
  
  $scope.questionbox_keydown = function(event){
    if(event.keyCode == 13){
      $scope.insert($scope.questionbox);
      $scope.questionbox = "";
    }
  };
  
  $scope.deleteQuestion = function(index){
    var temp = JSON.parse(localStorage["questions"]);
    $scope.questions.splice(index,1);
    temp.splice(temp.length - index - 1,1);
    localStorage["questions"] = JSON.stringify(temp);
    
  };
  
  $scope.refresh();
});