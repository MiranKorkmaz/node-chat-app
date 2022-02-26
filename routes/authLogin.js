const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Setup view engine and views folder
app.set("view engine", "ejs");
app.set("views", "views");

//For parsing json data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get("/", (req, res, next) => {
  res.status(200).render("login");
});

router.post("/", async (req, res, next) => {
  //Destructor email & password from req.body
  const { email, password } = req.body;
  const payload = req.body;
  if (email && password) {
    //Check if user exists
    const user = await User.findOne({ email: email }).catch((error) => {
      console.log(error);
      res.status(200).render("register", payload);
    });
    if (user != null) {
      //Check if password matches
      const comparePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (comparePassword === true) {
        //If password matches, set session user to user
        req.session.user = user;
        return res.redirect("/");
      } else {
        console.log("User does not exist");
      }
    }
  }
  //If user does not exist, render login page
  res.status(200).render("login");
});

module.exports = router;