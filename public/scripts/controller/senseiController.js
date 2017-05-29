'use strict';

var app = app || {};

(function(module){
  const Sensei = {};

  Sensei.tokenRequest = () => {
    $.get("https://opentdb.com/api_token.php?command=request")
    .then((data)=> {
      if(data.response_code === 0){
         data.issueTime = Math.floor(new Date().getTime() / 1000);
         data.expirationTime = data.issueTime + 21600; //21600 is 6 hours 
         console.log(data);
         app.user.token = data;
      }else{
        console.log("Invalid Token Request")
      }
    },
    (err) =>{
      console.log(err);
    });
  }

  module.Sensei = Sensei;
})(app);


app.Sensei.tokenRequest();