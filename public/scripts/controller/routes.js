'use strict';

var app = app || {};

function setQuestions(ctx, next) {
   console.log(ctx.params.numQuestions);
  next();
}

function setDifficulty(ctx, next) {
  console.log(ctx.params.difficulty);
  next();
}

page('/game/:numOfQuestions/:difficulty', app.Sensei.hasValidToken, app.Sensei.getQuestions);

page('/about', app.aboutController.init);

page();
