userClickedPattern = [];

gamePattern = [];


buttonColours = [
  'red',
  'blue',
  'green',
  'yellow'
];

var level = 0;
var gameStarted = false;

$(document).keydown(function() {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  $('h1').text('level ' + level);
  let randomNumber = Math.floor(Math.random()* 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  flashButton(randomChosenColour);
  playSound(randomChosenColour);

  level++;
}

$('.btn').on('click', function() {
  var userChosenColour = $(this).attr('id');

  animatePress(userChosenColour);
  playSound(userChosenColour);

  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log('success')
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
      nextSequence();
      }, 1000);
    } 
    
  } else {
    $('body').addClass('game-over');
    var gameOverSound = new Audio('sounds/wrong.mp3');
    gameOverSound.play();
    $('h1').text('Game Over. You reached level ' + level + '. Press Any Key to Restart.');
    startOver();
    setTimeout(function() {
      $('body').removeClass('game-over');
    }, 200);
  }
}

function startOver() {
  gameStarted = false;
  level = 0;
  gamePattern = [];
}

function flashButton(randomChosenColour) {
  $('.' + randomChosenColour).fadeOut(100).fadeIn(100);
}

function playSound(randomChosenColour) {
  var audio = new Audio('sounds/' + randomChosenColour + '.mp3');
  audio.play();
}

function animatePress(chosenColour) {
  $('#' + chosenColour).addClass('pressed');
  setTimeout(function() {
    $('#' + chosenColour).removeClass('pressed');
  }, 100);
}
