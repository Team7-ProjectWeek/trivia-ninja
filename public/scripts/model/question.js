'user strict';

var app = app || {};

(function (module) {
  function Question (rawDataObj) {
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  }

  function answerRandomizer (arr) {
    let randIndex = Math.floor(Math.random() * arr.length);
    return arr.splice(randIndex, 1);
  }

  Question.prototype.toHtml = function () {
    let template = Handlebars.compile($('#questionTemplate').html());
    let answers = [this.correct_answer];
    this.incorrect_answers.forEach(e => answers.push(e));
    this.isFreePlay = app.Question.isFreePlay;
    if (this.type === 'multiple') {
      this.isMultiple = true;
      this.option1 = answerRandomizer(answers)[0];
      this.option2 = answerRandomizer(answers)[0];
      this.option3 = answerRandomizer(answers)[0];
      this.option4 = answerRandomizer(answers)[0];
    } else {
      this.isMultiple = false;
      this.option1 = answerRandomizer(answers)[0];
      this.option2 = answerRandomizer(answers)[0];
    }
    return template(this)
  };

  Question.all = [];
  Question.currentQuestionIndex = 0;
  Question.isFreePlay = false;
  Question.selectedAnswer = '';

  Question.loadAll = (rawQuestions) => {
    Question.all = rawQuestions.map(ele => new Question(ele));
  };

  module.Question = Question;
})(app);
