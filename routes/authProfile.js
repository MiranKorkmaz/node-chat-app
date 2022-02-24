const bodyParser = require("body-parser")
const express = require("express")
const app = express()
const router = express.Router()
const User = require("../models/User");
const bcrypt = require("bcrypt")

router.get("/", (req, res, next) => {
    res.status(200).render("profile")
})

    router.post("/", async (req, res, next) => {
          if (user != null) {
            const comparePassword = await bcrypt.compare(req.body.password, user.password)
            if (comparePassword === true) {
              req.session.user = user
              return res.redirect("profile")
            } else {
              console.log("User does not exist")
            }
          }
        res.status(200).render(login) 
      })
module.exports = router