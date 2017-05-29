'user strict';

var app = app || {};

(function(module){

  function Question(rawDataObj) {
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  }

  Question.all = [];

  Question.loadAll = (rawQuestions) => {
    Question.all = rawQuestions.map(ele => new Question(ele));
  };
  
  module.Question = Question;
})(app);