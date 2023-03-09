var started = false;
var level = 0;
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColour;


$("body").keypress(function () {
    if (started == false) {
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    $(this).fadeOut(100).fadeIn(100);
    var userChosenColour = $(this).attr("id");
    console.log(userChosenColour);
    playSound(userChosenColour);
    animatePress($(this).attr("id"));
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    console.log(userClickedPattern.length - 1);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    level++;
    $("#level-title").html("level " + level);
    randomChosenColour = buttonColors[randomNumber];
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    userClickedPattern = [];
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        console.log("true");
        if (currentLevel == gamePattern.length - 1) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("false");
        gameOver();
        startOver();
    }
}

function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    $("#level-title").html("Game Over, Press Any Key to Restart");
}

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function startOver() {
    gamePattern = [];
    level = 0;
    started = false;
}