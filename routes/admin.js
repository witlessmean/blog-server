const express = require("express");
const db = require("../utils/database");

const router = express.Router();

router.post("/add-post", (req, res, next) => {
  res.send("<h1>add a post please</h1>");
  const postData = req.body;
  const title = JSON.stringify(postData.title);
  const description = JSON.stringify(postData.description);
  const link = JSON.stringify(postData.link);
  db.execute(
    `INSERT INTO blog_posts (post_title, post_about, post_link) VALUES (${title}, ${description}, ${link})`
  ).catch((err) => {
    console.log(err);
  });
});

module.exports = router;
