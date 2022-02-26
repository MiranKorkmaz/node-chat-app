const mongoose = require("mongoose");
const express = require("express");

//Post Schema for MongoDB
const postSchema = new mongoose.Schema(
  {
    post: {
      type: String,
      required: true,
    },
    postedBy: {
      type: String,
      required: true,
    },
    publishedDate: {
      type: Date,
      default: Date.now, // Default date is current date
    },
    //Helps to know who created the post
    user: {
      type: mongoose.Schema.Types.ObjectId, // ObjectId is a reference to another document in the database
      ref: "User", //ref is the name of the collection
    },
  },
  { timestamps: true }
);

//Populate the user field with the user who created the post
postSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "-__v",
  });
  next();
});
//Create the model from the schema
const Post = mongoose.model("Post", postSchema);
module.exports = Post;