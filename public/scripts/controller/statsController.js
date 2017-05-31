'use strict';

var app = app || {};

(function (module) {
  const statsController = {};

  // get number of questions and answers.
  statsController.completeGame = function(){
    console.log("In statsController.completeGame");
    app.stat.stopTime();
    app.statView.complete();
  }


  module.statsController = statsController;
})(app);
