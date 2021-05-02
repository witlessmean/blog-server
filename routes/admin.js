const express = require("express");
const db = require("../utils/database");

const router = express.Router();

//db.setMaxListeners(0)


router.post("/add-post", (req, res, next) => {
  res.send("<h1>add a post please</h1>");
  const postData = req.body;
  const title = JSON.stringify(postData.title);
  const description = JSON.stringify(postData.description);
  const link = JSON.stringify(postData.link);
  
  db.execute(
    `INSERT INTO blog_posts (post_title, post_about, post_link) VALUES (${title}, ${description}, ${link})`
  ).then((stuff) => {
    //console.log(stuff)
  }).catch((err) => {
    console.log(err);
  });
});

router.delete("/deleteLastPost/:titleToBeDeleted", (req, res, next) => {
    
    console.log(req.params.titleToBeDeleted)
   
    db.execute(
        "DELETE FROM blog_posts ORDER BY post_id DESC LIMIT 1"
    ).then((stuff) => {
     // console.log(stuff)
    }).catch((err) => {
        console.log(err);
      });
});

router.delete("/deleteDynamicPost/:titleToBeDeleted", (req, res, next) => {
    
    //console.log(req.params.titleToBeDeleted)
   
    const title = JSON.stringify(req.params.titleToBeDeleted)

     db.execute(
        `DELETE FROM blog_posts WHERE post_title = ${title}`
    ).then((stuff) => {
     // console.log(stuff)
    }).catch((err) => {
        console.log(err);
      });
});

router.patch("/updatePostTitle", (req, res, next) => {

    const postData = req.body;
    const titleToBeUpdated = JSON.stringify(postData.titleToBeUpdated)
    const title = JSON.stringify(postData.title);

db.execute(
    `UPDATE blog_posts SET post_title = ${title} WHERE post_title = ${titleToBeUpdated}`
).catch((err) => {
    console.log(err)
  })

})
router.patch("/updatePostDesc", (req, res, next) => {

    const postData = req.body;
    const titleToBeUpdated = JSON.stringify(postData.titleToBeUpdated)
    const description = JSON.stringify(postData.description);
    

db.execute(
    `UPDATE blog_posts SET post_description = ${description} WHERE post_title = ${titleToBeUpdated}`
).catch((err) => {
    console.log(err)
  })

})
router.patch("/updatePostLink", (req, res, next) => {

    const postData = req.body;
    const titleToBeUpdated = JSON.stringify(postData.titleToBeUpdated)
    const link = JSON.stringify(postData.link);

db.execute(
    `UPDATE blog_posts SET post_link = ${link} WHERE post_title = ${titleToBeUpdated}`
).catch((err) => {
  console.log(err)
})

})

module.exports = router;
