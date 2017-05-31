'use strict';

var app = app || {};

(function (module) {
  const statView = {};

  //append statView to index.html
  statView.complete = () => {
    $('#questionModal').hide();
    $('.final-score').html(`FINAL SCORE: ${app.stat.score}`);
    $('.final-time').html(`FINAL TIME: ${app.stat.time}`);
    $('.trivia-complete-container').fadeIn(100);
  }
  module.statView = statView;
})(app);
