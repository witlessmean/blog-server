const express = require('express');
const db = require('./utils/database');
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

app.get('/', (req, res, next) => {

    console.log('hello this is you')
    
    res.send('<h1>Welcome back</h1>')
  });

  app.post('/', (req, res, next) => {
   const postData = req.body;
   const title = JSON.stringify(postData.title);
   const description = JSON.stringify(postData.description);
   const link = JSON.stringify(postData.link);
    db.execute(`INSERT INTO blog_posts (post_title, post_about, post_link) VALUES (${title}, ${description}, ${link})`)
  });
  
    db.execute('select * from blog_posts').then((result) => {
    console.log(result)
  }).catch((err) => {
    console.log(err)
  })
  
    
















const PORT = process.env.PORT || 8080;
app.listen(PORT);