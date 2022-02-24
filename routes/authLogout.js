const express = require("express");
const app = express()
const router = express.Router()
const bodyParser = require("body-parser")

app.use(bodyParser. urlencoded({extended: false}))
app.use(bodyParser.json())

router.get("/", (req, res, next) => {
    if(req.session) {
        req.session.destroy(() => {
            res.redirect("/login")
        })
    }
});


module.exports = router