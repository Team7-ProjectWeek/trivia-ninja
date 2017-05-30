'use strict';

var app = app || {};

(function(module){
  const stat = {};

  let easy = 100, medium = 200, hard = 300;
  let difficultyValue = 0;
  let timer;
  stat.numberOfCorrect = 0;
  stat.score = 0;
  stat.questionStartTime = 0;
  stat.time = 0;
  
  stat.timeInit = function () {
     timer = setInterval(stat.countTimeTotalScore, 1000);
  }


  stat.countTimeTotalScore = function () {
    stat.time += 1;
    stat.score -= 1;
    $('.stats-timer').html(`Time: ${stat.time}`);
    $('.stats-score').html(`Score: ${stat.score}`);
  }

  stat.stopTime = function () {
    clearInterval(stat.time);
  }

  stat.statCalculator = function (difficulty, time) {
    switch(difficulty){
      case "easy":
        difficultyValue = easy;
        break;
      case "medium":
        difficultyValue = medium;
        break;
      case "hard":
        difficulty = hard;
        break;
    }
    stat.score = (stat.numberOfCorrect * difficultyValue) - time;
  }


  module.stat = stat;

})(app);
