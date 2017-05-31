'use strict';

var app = app || {};

(function (module) {
  const statView = {};

  //append statView to index.html
  statView.complete = () => {
    $('#questionModal').hide();
    $('.final-score').html(`FINAL SCORE: ${app.stat.score}`);
    $('.final-time').html(`FINAL TIME: ${app.stat.time}`);
    app.statsController.populateTopScores();
    $('.trivia-complete-container').fadeIn(100);
  }

  statView.updateStats = () =>{
    $('.stats-correct-answers').html(`CORRECT ANSWERS: ${app.stat.numberOfCorrect}`);
    $('.stats-progress').html(`Question: ${app.Question.currentQuestionIndex+1}/${app.Question.all.length}`);
  }
  
  module.statView = statView;
})(app);
