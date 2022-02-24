const bodyParser = require("body-parser")
const express = require("express")
const app = express()
const router = express.Router()

router.get("/", (req, res, next) => {
    res.status(200).render("profile.ejs")
})

module.exports = router