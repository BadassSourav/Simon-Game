let gamePattern = [];
let userClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;

function nextSequence() {
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level "+level);
    userClickedPattern = [];
}
// nextSequence();
$(".btn").click(function(){
    const userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
//     console.log(userClickedPattern);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

let flag = false;
$(document).keypress(function (e) { 
    if(flag==false){
        $("#level-title").text("Level "+level);
        nextSequence();
        flag = true;
    }
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
//         console.log("Success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();
        $(".body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
//         console.log("Wrong");
    }
}
function startOver(){
    level = 0;
    gamePattern = [];
    flag = false;
}
