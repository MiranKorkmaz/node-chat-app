const mongoose = require("mongoose")
const { isEmail } = require("validator")
const bcrypt = require("bcrypt")
const express = require("express")

const userSchema = new mongoose.Schema ({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: [true, "Please enter a email"],
        unique: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Minimum password length is 6 character"]
    },
    profilePic: {
        type: String,
        default: "/images/profilePicture.png"
    }
}, {timestamps: true})


// creating a mongoose hook to fire a function after a new user has been saved to database 
// pre saving --> fire function 
// hash password so it doesnt show in mongodb database
// a salt is a random string
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next();
}) 


const User = mongoose.model("User", userSchema)
module.exports = User