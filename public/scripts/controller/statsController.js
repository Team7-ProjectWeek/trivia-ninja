'use strict';

var app = app || {};

(function (module) {
  const statsController = {};

  // complete game on done button press
  statsController.completeGame = function () {
    app.stat.stopTime();
    app.statView.complete();
  }

  statsController.populateTopScores = function () {
    $('.leaderboard-div').children().fadeOut();
    $('.leaderboard-div').children().remove();
    $.get('/topScores').then(
      (result) => {
        result.forEach((row) => {
          $('.leaderboard-div').append(app.stat.scoreToHtml(row));
        })
      })
  }

  module.statsController = statsController;
})(app);
