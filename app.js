const express = require("express");
const app = express()
const PORT = 3000;
const middlewear = require("./middlewear/middlewear")
app.use(express.static("public"))
app.set("view engine", "ejs")
app.set("views", "views")

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