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


router.post("/", async (req, res, next) => {
    const {firstName, lastName, email, password} = req.body
    const payload = req.body
    if(firstName && lastName && email && password) {
        const user = await User.findOne({email: email}).catch((error) => {
            console.log(error)
            res.status(200).render("register", payload)
        }) // no user found
        if (user == null) {
            User.create({firstName, lastName, email, password}).then((user) => {
                req.session.user = user
                return res.redirect("/")
            })
        } else {
            res.status(200).render("register", payload)
        }
    } else {
        payload.errorMessage = "Error, user not created"
        res.status(200).render("register", payload)
    }

  });

module.exports = router