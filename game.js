

var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red","green","blue","yellow"];

var started = false;
var level = 0;

$(document).on("keydown",function(){

    if (started === false) {
      $("h1").text("Level"+level);
      nextSequence();
      started = true;
    }

});


$(".btn").on("click",handler);           // you can specify the name of the function inside any method in jquery
function handler() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
}


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (gamePattern.length === userClickedPattern.length) {
          setTimeout (function (){
            nextSequence();
          }, 1000);
      }

  } else {

      console.log("wrong");

      playSound("wrong");

      $("body").addClass("game-over");
      $("h1").text("Game Over, Press Any Key to restart");

      setTimeout (function(){
        $("body").removeClass("game-over");
      },200);

      startOver();
  }

}


function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level ++;
  $("h1").text("Level "+ level);
}



function playSound(name) {
  new Audio ('sounds/'+name+'.mp3').play();
}

function animatePress(currentColor) {

  $("#"+currentColor).addClass("pressed");

  setTimeout ( function(){            // Please be carful when using syntax its *setTimeout* and not setTimeOut, the letter 'o' shouldnot be capitalized.
    $("#"+currentColor).removeClass("pressed");
  }, 100);

}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
