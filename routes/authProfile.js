const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  //Find post by user id who is logged in
  const userPosts = await Post.find({ user: req.session.user._id });
  //Render profile page with user info and posts
  res.status(200).render("profile", {
    posts: userPosts,
    user: req.session.user,
    showForm: true,
  });
});
router.get("/:userId", async (req, res) => {
  //Find post by user id who is logged in
  const userPosts = await Post.find({ user: req.params.userId });
  const showForm = req.params.userId === req.session.user._id;
  //Render profile page with user info and posts
  res
    .status(200)
    .render("profile", { posts: userPosts, user: req.session.user, showForm });
});
//Handle post request to update profile
router.post("/", async (req, res, next) => {
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
