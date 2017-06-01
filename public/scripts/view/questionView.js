'use strict';

var app = app || {};

(function (module) {
  const QuestionView = {};

  QuestionView.serveQuestion = () => {
    $('.main-header').hide();
    $('#mainGame').hide();
    $('.question-container').empty();
    $('.stats-container').css('display','flex');
    app.stat.questionStartTime = app.stat.time;

    app.statView.updateStats();
    $('#questionModal').append(app.Question.all[app.Question.currentQuestionIndex].toHtml());

    console.log(app.Question.currentQuestionIndex)

    $('.question-button').on('click', function () {
      if ($('.question-button').text() === 'DONE') {
        app.statsController.completeGame();
      } else {
        // console.log('if', app.Question.all[0]);
        if (app.Question.currentQuestionIndex < app.Question.all.length - 2) {
          app.Sensei.evaluateAnswer();
          app.Question.currentQuestionIndex += 1;
          app.stat.stopTime();
          window.setTimeout(function(){
            app.stat.timeInit();
            app.QuestionView.serveQuestion()}, 750);


        } else {
          app.Sensei.evaluateAnswer();
          app.Question.currentQuestionIndex += 1;
          app.QuestionView.serveQuestion();
          $('.question-button').html('DONE');
        }
      }
    });

    $('.free').on('click', function () {
      if (app.Question.currentQuestionIndex < app.Question.all.length - 1) {
        app.Sensei.evaluateAnswer();
        app.Question.currentQuestionIndex += 1;
        app.QuestionView.serveQuestion();
      } else {
        console.log('in changing done');
        app.Sensei.evaluateAnswer();
        app.freePlayController.continueFreeQuestions();

          // also ideally this would have a done button, where you can tally your points
      }
    });

    $('.option').on('click', function (event) {
      $(this).siblings().removeClass('question-selected');
      $(this).toggleClass('question-selected');
      // app.Question.selectedAnswer = $(this).text();
    })
  }

  module.QuestionView = QuestionView;
})(app);
