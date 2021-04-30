const express = require('express');
const db = require('./utils/database');
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

app.use('/', (req, res, next) => {

    console.log('hello this is you')
    
    res.send('<h1>Welcome back</h1>')
    });

  db.execute('select * from blog_posts').then((result) => {
    console.log(result)
  }).catch((err) => {
    console.log(err)
  })
  
    
















const PORT = process.env.PORT || 8080;
app.listen(PORT);