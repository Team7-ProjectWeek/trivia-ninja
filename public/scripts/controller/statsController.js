'use strict';

var app = app || {};

(function (module) {
  const statsController = {};

  // get number of questions and answers.

  statsController.completeGame = function(){
    console.log("In statsController.completeGame");
    app.stat.stopTime();
    app.statView.complete();
  }

  statsController.populateTopScores = function(){
    $('.leaderboard-div').children().fadeOut();
    $('.leaderboard-div').children().remove();
    $.get('/topScores').then(
      (result) => {
        result.forEach((row) =>{
          $('.leaderboard-div').append(app.stat.scoreToHtml(row));
        })
      })
  }

  module.statsController = statsController;
})(app);
