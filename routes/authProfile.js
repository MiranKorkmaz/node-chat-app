const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

router.get("/", async (req, res, next) => {
  //Find post by user id who is logged in
  const userPosts = await Post.find({ user: req.session.user._id });
  //Render profile page with user info and posts
  res
    .status(200)
    .render("profile", { posts: userPosts, user: req.session.user });
});
//Handle post request to update profile
router.post("/", async (req, res, next) => {
  //Find user by id
  const userPosts = await Post.find({ user: req.session.user._id });
  //Update user info
  const updateUserObj = {
    ...req.body,
    profilePic: req.file?.filename //If user did not upload a profile pic, profile pic will be previous profile pic
      ? `/images/${req.file?.filename}`
      : req.session.user.profilePic,
  };
  const updatedUser = await User.findByIdAndUpdate(
    req.session.user._id,
    updateUserObj,
    { new: true }
  );
  //Reset session user to updated user
  req.session.user = updatedUser;
  //Render profile page with updated user info and posts
  res.redirect("/profile");
});
module.exports = router;