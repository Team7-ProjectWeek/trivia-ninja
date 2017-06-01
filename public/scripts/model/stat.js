'use strict';

var app = app || {};

(function (module) {
  const stat = {};

  stat.scoreToHtml = (rawScore) => {
    let template = Handlebars.compile($('#leaderBoardScoreTemplate').html());
    return template(rawScore)
  }

  let easy = 100;
  let medium = 200;
  let hard = 300;
  let difficultyValue = 0;
  stat.timer;
  stat.numberOfCorrect = 0;
  stat.score = 0;
  stat.questionStartTime = 0;
  stat.time = 0;
  stat.runningTotalScore = 0;
  stat.runningQuestionCount = 0;

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
    $('.stats-correct-answers').html(`CORRECT ANSWERS: ${stat.numberOfCorrect}`);
    // if (app.Question.isFreePlay) {
    //   $('.stats-progess').html(`Question: ${stat.runningQuestionCount - 1}/Infinity`);
    // } else {
    //   $('.stats-progess').html(`Question: ${stat.runningQuestionCount - 1}/${app.Question.all.length}`);
    // }
  }

  stat.stopTime = function () {
    clearInterval(stat.timer);
  }

  stat.statCalculator = function (difficulty, time) {
    stat.runningQuestionCount += 1;
    switch (difficulty) {
      case 'easy':
        difficultyValue = easy;
        break;
      case 'medium':
        difficultyValue = medium;
        break;
      case 'hard':
        difficultyValue = hard;
        break;
    }
    stat.runningTotalScore = stat.runningTotalScore + difficultyValue;
    stat.score = Math.floor(((stat.numberOfCorrect * (stat.runningTotalScore / stat.runningQuestionCount)) - time * ((stat.runningTotalScore / stat.runningQuestionCount) / 100)));
  }

  module.stat = stat;
})(app);
