'use strict';

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./public'))

app.get('/game/*', tell you wehre to go)

app.listen(PORT, function() {
  console.log(`You are running on PORT ${PORT}`)
});
