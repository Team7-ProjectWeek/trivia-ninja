'use strict';

$(document).ready(function () {
  $('.save-score-button').on('click', function(){
    $.post('/logScore', {
      initials: $('#initials')[0].value || "MDN",
      gameId: 'single',
      totalScore: app.stat.score,
      totalTime: app.stat.time
    }).then(() => {
        $('.final-header').text('Your score has been saved!');
        $(this).hide();
        app.statsController.populateTopScores();
    }, () => $('.final-header').text('Failed to save your score try again!'))

  });
})
