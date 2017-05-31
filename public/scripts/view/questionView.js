'use strict';

var app = app || {};

(function (module) {
  const QuestionView = {};

  QuestionView.serveQuestion = () => {
    $('.main-header').hide();
    $('#mainGame').hide();
    $('.question-container').empty();
    $('.stats-container').show();
    app.stat.questionStartTime = app.stat.time;

    $('#questionModal').append(app.Question.all[app.Question.currentQuestionIndex].toHtml());

    console.log(app.Question.currentQuestionIndex)

    $('.question-button').on('click', function () {
      if ($('.question-button').text() === 'DONE') {
        console.log('In Done Eval');
        app.statsController.completeGame();
      } else {
        if (app.Question.currentQuestionIndex < app.Question.all.length - 2) {
          app.Sensei.evaluateAnswer();
          app.Question.currentQuestionIndex += 1;
          app.QuestionView.serveQuestion();
        } else {
          console.log('in changing done');
          app.Sensei.evaluateAnswer();
          app.Question.currentQuestionIndex += 1;
          app.QuestionView.serveQuestion();
          $('.question-button').html('DONE');
        }
      }
    });

    $('.option').on('click', function (event) {
      $(this).siblings().removeClass('question-selected');
      $(this).toggleClass('question-selected');
      app.Question.selectedAnswer = $(this).text();
    })
  }

  module.QuestionView = QuestionView;
})(app);
