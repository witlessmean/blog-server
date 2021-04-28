const express = require('express');


const app = express();

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

app.use('/', (req, res, next) => {
  res.send('<h1>Welcome back</h1>')
});


////









const PORT = process.env.PORT || 8080;
app.listen(PORT);