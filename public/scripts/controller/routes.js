'use strict';

var app = app || {};

page('/game/:numOfQuestions/:difficulty', app.Sensei.hasValidToken, app.Sensei.getQuestions);

page('/about', app.aboutController.init);

page();
