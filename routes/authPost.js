const bodyParser = require("body-parser")
const express = require("express")
const Post = require("../models/Post")
const app = express()
const router = express.Router()

let POSTS = []

router.get("/", (req, res, next) => {
    res.status(200).render("index", {POSTS})
})

router.post("/", async (req, res, next) => {
    const { post_text } = req.body   
    const today_date = new Date();
    const date = `${today_date.toLocaleDateString()} at ${today_date.toLocaleTimeString()}`
    POSTS.push({ post_text, date })

    console.log(entry)

    res.redirect("/index")
})

module.exports = router