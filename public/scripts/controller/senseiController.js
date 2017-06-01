'use strict';

var app = app || {};

(function (module) {
  function htmlDecoder (value) {
    return $('.decoder').html(value).text();
  }

  const Sensei = {};

  Sensei.paramsValidator = function (numOfQuestions, difficulty) {
    if (difficulty === 'easy' || difficulty === 'medium' || difficulty === 'hard' || difficulty === 'any') {
      if (numOfQuestions <= 50 && numOfQuestions > 0) {
        return true;
      }
    } else {
      return false;
    }
  }


  Sensei.hasValidToken = (ctx, next) => {
    if (localStorage.apiToken) {
      app.user.token = JSON.parse(localStorage.apiToken);
    }

    if (!app.user.token || app.user.token.expirationTime <= Math.floor((new Date()).getTime() / 1000)) {
      app.Sensei.tokenRequest(next);
    } else {
      next();
    }
  }

  Sensei.tokenRequest = (callback) => {
    $.get('https://opentdb.com/api_token.php?command=request')
    .then((data) => {
      if (data.response_code === 0) {
        data.issueTime = Math.floor(new Date().getTime() / 1000);
        data.expirationTime = data.issueTime + 21600; // 21600 is 6 hours
        localStorage.setItem('apiToken', JSON.stringify(data));
        app.user.token = data;
        callback();
      }
    },
    (err) => {
      console.log(err);
    });
  };

  Sensei.getNumQuestions = () => {
    return $('#numQuestions option:selected').text();
  };

  Sensei.getDifQuestions = () => {
    return $('#difQuestions option:selected').text();
  };

  Sensei.replaceUrl = (numQuestions, difQuestions) => {
    location.replace(`/game/${numQuestions}/${difQuestions}`);
  }

  Sensei.go = () => {
    Sensei.replaceUrl(Sensei.getNumQuestions(), Sensei.getDifQuestions());
  }

  $('#playButton').on('click', function (event) {
    event.preventDefault();
    Sensei.go();
  })

  Sensei.getQuestions = (ctx, next) => {
    if (app.Sensei.paramsValidator(ctx.params.numOfQuestions, ctx.params.difficulty)){
      let url = `https://opentdb.com/api.php?amount=${ctx.params.numOfQuestions}&difficulty=${ctx.params.difficulty}&token=${app.user.token.token}`
      app.Question.isFreePlay = false;
      app.Question.currentQuestionIndex = 0;
      $.get(url).then((data) => {
        app.Question.loadAll(data.results);
        app.stat.timeInit();
        app.QuestionView.serveQuestion();
      });
    }
  }

  Sensei.freeQuestions = (ctx, next) => {
    let url = `https://opentdb.com/api.php?amount=${ctx.params.numOfQuestions}&token=${app.user.token.token}`
    app.Question.currentQuestionIndex = 0;
    $.get(url).then((data) => {
      app.Question.loadAll(data.results);
      app.stat.timeInit();
      app.QuestionView.serveQuestion();
    });
  }

  Sensei.evaluateAnswer = function () {
    $('.option').each(function () {
      let optionText = $(this).html();
      let correctAns = htmlDecoder(app.Question.all[app.Question.currentQuestionIndex].correct_answer);
      if (optionText === correctAns) {
        $(this).css('background-color', 'green');
      }
    })

    if (app.Question.selectedAnswer === htmlDecoder(app.Question.all[app.Question.currentQuestionIndex].correct_answer)) {
      app.stat.numberOfCorrect += 1;
      let timeTaken = app.stat.time - app.stat.questionStartTime;
      app.stat.statCalculator(app.Question.all[app.Question.currentQuestionIndex].difficulty, timeTaken);
    }
  }

  module.Sensei = Sensei;
})(app);
