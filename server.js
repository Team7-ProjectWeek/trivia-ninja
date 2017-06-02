'use strict';

const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
 // 'postgres://localhost:5432'
const conString = process.env.DATABASE_URL || 'postgres://postgres:passwordhere@localhost:5432/kilovolt';

const app = express();
const client = new pg.Client(conString);
client.connect();
client.on('error', err => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'))

dbInitialize();

app.get('/topScores', function(request,response){
  client.query(`select initials, total_score, total_time from scores order by total_score desc limit 10; `)
        .then((results) => response.send(results.rows))
        .catch(console.error);
});

app.post('/logScore', function(request, response) {
  console.log(request.body);

  client.query(`INSERT INTO
                scores(initials, game_id, total_score, total_time)
                VALUES ($1,$2,$3,$4);`,
                [request.body.initials,
                 request.body.gameId,
                 request.body.totalScore,
                 request.body.totalTime])
        .then(function() {
          response.send('Post Successful')
        })
        .catch(console.error);
});

app.get('/game/*/*', (req, res) => {
  res.sendFile('index.html', {root: './public'})
});

app.get('*', (req, res) => {
  res.sendFile('index.html', {root: './public'})
});

app.listen(PORT, function() {
  console.log(`You are running on PORT ${PORT}`)
});




//Database initialization
function dbInitialize(){
    client.query(`
    CREATE TABLE IF NOT EXISTS
    scores (
      id SERIAL PRIMARY KEY,
      initials VARCHAR(3) NOT NULL,
      game_id VARCHAR(255),
      total_score INT,
      total_time INT
    );`
  ).catch(console.error);
}
