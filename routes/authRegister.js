const express = require("express");
const app = express()
const router = express.Router()
const bodyParser = require("body-parser")
const User = require("../models/User")

app.use(bodyParser.urlencoded({extended: false}))
app.set("view engine", "ejs")
app.set("views", "views")

router.get("/", (req, res, next) => {
  res.status(200).render("register")
});

router.post("/", (req, res, next) => {
    const {firstName, lastName, email, password} = req.body
    const payload = req.body
    if(firstName && lastName && email && password) {
        User.findOne({email: email})
        .then((user) => {
            console.log(user)
        })
        console.log("Hi")
    } else {
        payload.errorMessage = "Enter values in all fields"
        res.status(200).render("register", payload)
    }

  });

module.exports = router