'use strict';

var app = app || {};

(function (module) {
  const aboutController = {};

  aboutController.init = function () {
    $('.main-header').hide();
    $('#mainGame').hide();
    $('#questionModal').hide();
    $('.trivia-complete-container').hide();
    $('#about').fadeIn(800);
    
    if($('.ham-menu').css('display') === 'block'){
      $('.mobile-menu').toggleClass('mobile-menu-shown');
    }
  }

  module.aboutController = aboutController;
})(app);
