app.directive("blockImage", function(){
  return {
   restrict:"E",
   templateUrl:"js/templates/image.html",
   scope:
   {
     src:'@source'
   }
  };
});