'use strict';

var app = app || {};

(function(module){
  const stat = {};



  let easy = 100, medium = 200, hard = 300;
  let time = 0;
  stat.timeInit = function () {

    var timer = setInterval(stat.countTime, 1000);
  }


  stat.countTime = function () {
    time = time + 1;
    console.log(time);
  }

  stat.stopTime = function () {
    clearInterval(timer);
  }

  stat.statCalculator = function (numCorrect, difficulty, time) {
    return numCorrect * difficulty - time;
  }


  module.stat = stat;

})(app);
