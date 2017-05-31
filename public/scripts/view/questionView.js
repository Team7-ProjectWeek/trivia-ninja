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

    $('.question-button').on('click', function (event) {
      app.Sensei.evaluateAnswer();

      if (app.Question.currentQuestionIndex < app.Question.all.length - 1)
        app.Question.currentQuestionIndex += 1;
      else
        $('.question-button').html('DONE');

      app.QuestionView.serveQuestion();
    });

    $('.option').on('click', function (event) {
      $(this).siblings().removeClass('question-selected');
      $(this).toggleClass('question-selected');
      app.Question.selectedAnswer = $(this).text();
    })
  }

  module.QuestionView = QuestionView;
})(app);
