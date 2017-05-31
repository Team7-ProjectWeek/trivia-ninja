'use strict';

var app = app || {};

page('/game/:numOfQuestions/:difficulty', app.Sensei.hasValidToken, app.Sensei.getQuestions);

page('/game/:numOfQuestions', app.Sensei.hasValidToken, app.Sensei.freeQuestions);

page('/about', app.aboutController.init);

page();
