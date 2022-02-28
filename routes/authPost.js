const bodyParser = require("body-parser");
const express = require("express");
const Post = require("../models/Post");
const app = express();
const router = express.Router();

router.get("/", async (req, res, next) => {
  //Find all posts, sort it by latest post first 
  const allPosts = await Post.find({}).sort({publishedDate: -1});
  res.status(200).render("index", { allPosts: allPosts });
});

router.post("/", async (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  const { _id, email } = req.session.user;
  //Destructuring post title from req.body
  const { post } = req.body;
  //Creating new post object
  const newPost = new Post({
    post,
    postedBy: `${email}`,
    user: _id,
  });
  //Save new post to database
  newPost.save();
  //Redirect to index page
  res.redirect("/index");
});

module.exports = router;