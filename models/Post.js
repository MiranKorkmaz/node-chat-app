const mongoose = require("mongoose")
const express = require("express")

const postSchema = new mongoose.Schema ({}, {timestamps: true})


const Post = mongoose.model("Post", postSchema)
module.exports = Post