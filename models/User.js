const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const express = require("express");

// User Schema for MongoDB
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please enter a email"],
      unique: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Minimum password length is 6 character"],
    },
    profilePic: {
      type: String,
      default: "/images/profilePic.jpeg",
    },
    following: [{type: Schema.Types.ObjectId, ref: "User"}],
    followers: [{type: Schema.Types.ObjectId, ref: "User"}]
  },
  { timestamps: true }
);

//Convert plain text password to a hash
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Create a model from the schema
const User = mongoose.model("User", userSchema);
module.exports = User;