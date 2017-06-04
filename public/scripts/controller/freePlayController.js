'use strict';

var app = app || {};

(function (module) {
  const freePlayController = {};

  freePlayController.freeQuestions = (ctx) => {
    $('#about').hide();
    $('.trivia-complete-container').hide();
    $('#questionModal').show();
    if ($('.ham-menu').css('display') === 'block') {
      $('.mobile-menu').toggleClass('mobile-menu-shown');
    }

    if (app.Sensei.paramsValidator(ctx.params.numOfQuestions, 'any')) {
      let url = `https://opentdb.com/api.php?amount=${ctx.params.numOfQuestions}&token=${app.user.token.token}`
      app.Question.currentQuestionIndex = 0;
      app.Question.isFreePlay = true;
      $.get(url).then((data) => {
        app.Question.loadAll(data.results);
        app.stat.timeInit();
        app.QuestionView.serveQuestion();
        $('.stats-timer').hide();
        $('.stats-score').hide();
        $('.stats-progress').hide();
      });
    }
  }
  // continues free play by loading 50 new questions
  freePlayController.continueFreeQuestions = () => {
    let url = `https://opentdb.com/api.php?amount=50&token=${app.user.token.token}`
    app.Question.currentQuestionIndex = 0;
    $.get(url).then((data) => {
      app.Question.loadAll(data.results);
      app.QuestionView.serveQuestion();
    });
  }

  module.freePlayController = freePlayController;
})(app);
