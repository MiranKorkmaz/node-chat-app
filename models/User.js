const mongoose = require("mongoose")
const { isEmail } = require("validator")


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
        required: [true, "Please enter a username"],
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
})

const User = mongoose.model("User", userSchema)
module.exports = User