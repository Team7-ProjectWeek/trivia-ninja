'use strict';

var app = app || {};

(function (module) {
  const freePlayController = {};

  freePlayController.freeQuestions = (ctx, next) => {
    $('#about').hide();
    $('#questionModal').show();
    // show free play button
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

  freePlayController.continueFreeQuestions = (ctx, next) => {
    let url = `https://opentdb.com/api.php?amount=50&token=${app.user.token.token}`
    app.Question.currentQuestionIndex = 0;
    $.get(url).then((data) => {
      app.Question.loadAll(data.results);
      app.QuestionView.serveQuestion();
    });
  }

  module.freePlayController = freePlayController;
})(app);
