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

    $('.question-button').on('click', function () {
      if (app.Question.selectedAnswer != ''){
        if ($('.question-button').text() === 'DONE') {
          app.Sensei.evaluateAnswer();
          window.setTimeout(function(){
            app.statsController.completeGame();}, 650);
        } else {
          if (app.Question.currentQuestionIndex < app.Question.all.length - 2) {
            app.Sensei.evaluateAnswer();
            app.Question.currentQuestionIndex += 1;
            app.stat.stopTime();
            window.setTimeout(function(){
              app.stat.timeInit();
              app.QuestionView.serveQuestion()}, 650);
            } else {
              app.Sensei.evaluateAnswer();
              app.Question.currentQuestionIndex += 1;
              app.QuestionView.serveQuestion();
              $('.question-button').html('DONE');
            }
          }
        }
      });


      $('.free-button').on('click', function () {

        if (app.Question.selectedAnswer != ''){
          if (app.Question.currentQuestionIndex < app.Question.all.length - 1) {
            app.Sensei.evaluateAnswer();
            app.Question.currentQuestionIndex += 1;
            app.stat.stopTime();
            window.setTimeout(function(){
              app.stat.timeInit();
              app.QuestionView.serveQuestion()}, 650);
            } else {
              console.log('in changing done');
              app.Sensei.evaluateAnswer();
              app.freePlayController.continueFreeQuestions();
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
