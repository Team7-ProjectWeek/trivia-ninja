'use strict';

var app = app || {};

(function (module) {
  const Sensei = {};

  Sensei.hasValidToken = (ctx, next) => {
    if (!app.user.token || app.user.token.expirationTime <= Math.floor((new Date()).getTime() / 1000)) {
      console.log('Getting token now');
      app.Sensei.tokenRequest(next);
    } else {
      next();
    }

  }

  Sensei.tokenRequest = (callback) => {
    $.get("https://opentdb.com/api_token.php?command=request")
      .then((data) => {
        if (data.response_code === 0) {
          data.issueTime = Math.floor(new Date().getTime() / 1000);
          data.expirationTime = data.issueTime + 21600; //21600 is 6 hours 
          console.log(data);
          app.user.token = data;
          callback();
        } else {
          console.log("Invalid Token Request")
        }

      },
      (err) => {
        console.log(err);
      });
  }

  Sensei.getQuestions = (ctx, next) => {
    let url = `https://opentdb.com/api.php?amount=${ctx.params.numOfQuestions}&difficulty=${ctx.params.difficulty}&token=${app.user.token.token}`
    console.log(url);
    app.Question.currentQuestionIndex = 0;
    $.get(url).then((data) => {
      app.Question.loadAll(data.results);
      app.stat.timeInit();
      app.QuestionView.serveQuestion();
    });
  }

  Sensei.evaluateAnswer = () =>{
    console.log(app.Question.selectedAnswer+ " === " +app.Question.all[app.Question.currentQuestionIndex].correct_answer)
    if(app.Question.selectedAnswer === app.Question.all[app.Question.currentQuestionIndex].correct_answer){
      
      console.log("Answer is Correct");
      app.stat.numberOfCorrect +=1;
      let timeTaken = app.stat.time - app.stat.questionStartTime;

      console.log(app.stat.statCalculator(app.Question.all[app.Question.currentQuestionIndex].difficulty, timeTaken));
      
    }else{
      console.log("Answer is Wrong");
    }
      
  }

  module.Sensei = Sensei;
})(app);
