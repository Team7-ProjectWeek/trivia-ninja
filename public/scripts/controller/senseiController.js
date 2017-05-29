'use strict';

var app = app || {};

(function(module){
  const Sensei = {};

  Sensei.hasValidToken = (ctx, next) => {
    if(!app.user.token || app.user.token.expirationTime <= Math.floor((new Date()).getTime() / 1000)){
      console.log('Getting token now');
      app.Sensei.tokenRequest(next); 
    }else{
      next();
    }
    
  }

  Sensei.tokenRequest = (callback) => {
    $.get("https://opentdb.com/api_token.php?command=request")
    .then((data)=> {
      if(data.response_code === 0){
         data.issueTime = Math.floor(new Date().getTime() / 1000);
         data.expirationTime = data.issueTime + 21600; //21600 is 6 hours 
         console.log(data);
         app.user.token = data;
         callback();
      }else{
        console.log("Invalid Token Request")
      }
      
    },
    (err) =>{
      console.log(err);
    });
  }

  Sensei.getQuestions = (ctx, next) => {
    let url = `https://opentdb.com/api.php?amount=${ctx.params.numOfQuestions}&difficulty=${ctx.params.difficulty}&token=${app.user.token.token}`
    console.log(url);
    $.get(url).then((data) => {
      app.Question.loadAll(data.results);
      app.Question.all.map((question) =>{
        $('#theButton').parent().append(`<h1>${question.question}</h1>`);
      })
    });
  }


  module.Sensei = Sensei;
})(app);
