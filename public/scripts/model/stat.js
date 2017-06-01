'use strict';

var app = app || {};

(function (module) {
  const stat = {};

  let easy = 100;
  let medium = 200;
  let hard = 300;
  let difficultyValue = 0;
  stat.timer;
  stat.numberOfCorrect = 0;
  stat.score = 0;
  stat.questionStartTime = 0;
  stat.time = 0;

  stat.timeInit = function () {
    stat.timer = setInterval(stat.countTimeTotalScore, 1000);
  }

  stat.countTimeTotalScore = function () {
    stat.time += 1;

    switch (app.Question.all[app.Question.currentQuestionIndex].difficulty) {
      case 'easy':
        stat.score -= 1;
        break;
      case 'medium':
        stat.score -= 2;
        break;
      case 'hard':
        stat.score -= 3;
        break;
    }
    $('.stats-timer').html(`Time: ${stat.time}`);
    $('.stats-score').html(`Score: ${stat.score}`);
  }

  stat.stopTime = function () {
    clearInterval(stat.timer);
  }

  stat.statCalculator = function (difficulty, time) {
    switch (difficulty) {
      case 'easy':
        difficultyValue = easy;
        break;
      case 'medium':
        difficultyValue = medium;
        break;
      case 'hard':
        difficulty = hard;
        break;
    }
    stat.score = (stat.numberOfCorrect * difficultyValue) - time;
  }

  module.stat = stat;
})(app);
