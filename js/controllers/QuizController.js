app.controller("QuizController", function($scope, $routeParams, $location, QuizService, $sce){
  $scope.$location = $location;
  $scope.unit = $routeParams.unit;
  QuizService.success(function(data){
    $scope.questions = data.questions.filter(function(x){return x.unit == $scope.unit;});
    $scope.title = $scope.questions[0].title;
  });
  
  $scope.active = 0;
  $scope.answers = [];
  $scope.correct = [];
  
  $scope.number_correct = 0;
  $scope.number_total = 0;
  $scope.number_attempted = 0;
  
  $scope.resultStyle = {'display':'none'};
  
  $scope.submitAnswer = function(questionNumber){
    $scope.correct.push($scope.questions[questionNumber].answer == $scope.answers[questionNumber]);
    $scope.active += 1;
    if($scope.active >= $scope.questions.length){
      $scope.number_correct = $scope.correct.filter(function(x){return x;}).length;
      $scope.number_total = $scope.questions.length;
      $scope.number_attempted = $scope.correct.length;
      $scope.resultStyle = {'display':'block'};
    }
  };
    
    $scope.html = function(code){
        return $sce.trustAsHtml(code);  
    };
});