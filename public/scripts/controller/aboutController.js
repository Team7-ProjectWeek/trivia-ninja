'use strict';

var app = app || {};

(function(module){

  const aboutController = {};

  aboutController.init = function() {
    $('.main-header').hide();
    $('#mainGame').hide();

    $('#about').fadeIn(4500);
  }

  module.aboutController = aboutController;
})(app);