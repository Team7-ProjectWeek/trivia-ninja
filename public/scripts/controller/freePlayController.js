'use strict';

var app = app || {};

(function (module) {
  const freePlayController = {};

  freePlayController.freeQuestions = (ctx, next) => {
    $('ul li').hide();
    // show free play button
    let url = `https://opentdb.com/api.php?amount=${ctx.params.numOfQuestions}&token=${app.user.token.token}`
    console.log(url);
    app.Question.currentQuestionIndex = 0;
    $.get(url).then((data) => {
      app.Question.loadAll(data.results);
      app.stat.timeInit();
      app.QuestionView.serveQuestion();
    });
  }

  freePlayController.continueFreeQuestions = (ctx, next) => {
    $('ul li').hide();
    // show free play button
    let url = `https://opentdb.com/api.php?amount=50&token=${app.user.token.token}`
    console.log(url);
    app.Question.currentQuestionIndex = 0;
    $.get(url).then((data) => {
      app.Question.loadAll(data.results);
      app.QuestionView.serveQuestion();
    });
  }

  module.freePlayController = freePlayController;
})(app);
