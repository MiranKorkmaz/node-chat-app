const express = require("express");
const bodyParser = require("body-parser")
const app = express()
const PORT = 3000;
const middlewear = require("./middlewear/middlewear")
const mongoose = require("mongoose")
const session = require("express-session")


app.use(express.static("public"))
app.set("view engine", "ejs")
app.set("views", "views")

// bodyParser middlewear 
app.use(bodyParser. urlencoded({extended: false}))
app.use(bodyParser.json())

// sessions
app.use(session({
  secret: "chirp",
  resave: true,
  saveUninitialized: false
}))

// connect app to mongoose 
mongoose.connect("mongodb://localhost/users", {
}).then(console.log("mongoDB connected")).catch(err => console.log(err))

const authLogin = require("./routes/authLogin")
const authRegister = require("./routes/authRegister")
app.use("/login", authLogin)
app.use("/register", authRegister)

app.get("/", middlewear.reqLogin, (req, res, next) => {
  const loggedIn = req.session.user
  res.status(200).render("index", {loggedIn})
});

app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});