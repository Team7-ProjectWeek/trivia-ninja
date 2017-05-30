'use strict';

var app = app || {};

(function(module){

  const about = {};

  about.init = function() {
    $('.main-header').hide();
    $('#mainGame').hide();

    $('#about').fadeIn(4500);
  }

  module.about = about;
})(app);
