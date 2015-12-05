var app = angular.module("fizz-app", ["ngRoute", "ngAria", "ngMaterial"]);

$(document).ready(function(){
  $(window).load(function(){
    var msg = new SpeechSynthesisUtterance();
    msg.text = "Welcome, user!";
    msg.lang = 'en-US';
    speechSynthesis.speak(msg);
    setTimeout(function(){
      $("#splash").fadeOut(2000);  
    },2000)
    
  });
  $("#splash").click(function(){
    $("#splash").fadeOut(1500);
  });
  $("#toggleMenu").click(function(){
    $('#menu').fadeToggle(500);
    $('#headerimage').fadeToggle(100, function(){
      if($('#headerimage').css('display') == 'none'){
        $('header').css('background-color', 'white');  
        $('ng-view').css('overflow', 'auto');  
      }
      else{
        //$('header').css('background-color', 'rgba(255,255,255,1)'); 
        $('ng-view').css('overflow', 'hidden');  
      }
    });
  });
  $("#menu a").click(function(){
    $('#menu').fadeOut(500);
    $('#headerimage').fadeOut(100, function(){
      //$('header').css('background-color', 'white');  
      $('ng-view').css('overflow', 'auto');  
    });
  });
});