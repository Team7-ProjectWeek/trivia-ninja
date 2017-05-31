'use strict';

$(document).ready(function () {
  $('.save-score-button').on('click', function(){
    console.log("Sending score to DB");
    $.post('/logScore', {
      initials: $('#initials')[0].value || "MDN",
      gameId: 'single',
      totalScore: app.stat.score,
      totalTime: app.stat.time
    }).then(() => {
        $('.final-header').text('Your score has been saved!');
        $(this).hide();
    }, () => $('.final-header').text('Failed to save your score try again!'))
   
  });
})