const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require("../utils/database");
const router = express.Router();

//db.setMaxListeners(0)

router.post("/admin-password", (req, res) => {
  const postData = req.body;
  const postedPassword = postData.password;
  db.execute(
    `SELECT admin_password FROM password`
    ).then((result) => {
    const password = JSON.stringify(result[0][0].admin_password);
    const compared = bcrypt.compare(postedPassword, password)
     if(compared){
      
      res.status(200).send('success');
    }else{
      res.status(200).send('wrong password')
    }
    }).catch((err) => {
      console.error(err);
    })
});

router.post("/admin-page/password-reset", async (req, res) => {
  const postData = req.body;
  const checkedPW = JSON.stringify(postData.checkedPW);
  const pwChange = postData.pwChange;

  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(checkedPW, salt);
  const hashedCheckedPW = JSON.stringify(hashed);

  if(pwChange){
  db.execute(
    `UPDATE password SET admin_password = ${hashedCheckedPW} WHERE password_id = 1
    `
    ).then(() => {
      res.status(201).send('password successfully changed')
  }).catch((err) => {
    console.error(err)
  })
}
})


/////////////////////////old code
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
