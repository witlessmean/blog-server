const express = require('express');
const db = require('./utils/database');

const app = express();

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

app.use('/', (req, res, next) => {


  res.send('<h1>Welcome back</h1>')
});

app.get('/', (req, res, next) => {

  
  res.send('hello')
});










const PORT = process.env.PORT || 8080;
app.listen(PORT);