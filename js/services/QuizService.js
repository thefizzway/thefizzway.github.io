app.factory("QuizService", function($http){
  return $http.get("data/json/quiz.json").success(function(data){
    return data;
  }).error(function(err){
    return err;
  });
});