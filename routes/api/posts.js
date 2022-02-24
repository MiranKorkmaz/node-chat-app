const express = require("express");
const app = express()
const router = express.Router()
const bodyParser = require("body-parser")

app.use(bodyParser. urlencoded({extended: false}))
app.use(bodyParser.json())

router.get("/", (req, res, next) => {

});

router.post("/", async (req, res, next) => {
    res.status(200).send("hiii")
})

module.exports = router