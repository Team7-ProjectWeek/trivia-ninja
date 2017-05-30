'use strict';

var app = app || {};

(function(module){
  const QuestionView = {};

  QuestionView.serveQuestion = () => {
    $('.main-header').hide();
    $('#mainGame').hide();
    $('.question-container').empty()
    $('#questionModal').append(app.Question.all[app.Question.currentQuestionIndex].toHtml());
    
    $('.question-button').on('click', function (event){
      console.log('question button clicked');
      app.QuestionView.serveQuestion();
    });
    
    console.log(app.Question.currentQuestionIndex)
    if(app.Question.currentQuestionIndex < app.Question.all.length-1)
      app.Question.currentQuestionIndex += 1;
    else
      $('.question-button').html('DONE');
  }

  module.QuestionView = QuestionView;
})(app);


