const express = require("express");
const bodyParser = require("body-parser")
const app = express()
const PORT = 3000;
const middlewear = require("./middlewear/middlewear")
const mongoose = require("mongoose")


app.use(express.static("public"))
app.set("view engine", "ejs")
app.set("views", "views")

// bodyParser middlewear 
app.use(bodyParser. urlencoded({extended: false}))
app.use(bodyParser.json())

// connect app to mongoose 
mongoose.connect("mongodb://localhost/users", {
}).then(console.log("mongoDB connected")).catch(err => console.log(err))

const authLogin = require("./routes/authLogin")
const authRegister = require("./routes/authRegister")
app.use("/login", authLogin)
app.use("/register", authRegister)

app.get("/", middlewear.reqLogin, (req, res, next) => {
  res.status(200).render("index")
});

app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});