'use strict';

var app = app || {};

(function (module) {
  const indexController = {};

  indexController.init = function () {
    $('.main-header').fadeIn(800);
    $('#mainGame').fadeIn(800);
    $('#questionModal').hide();
    $('.trivia-complete-container').hide();
    $('#about').hide();
  }

  module.indexController = indexController;
})(app);
