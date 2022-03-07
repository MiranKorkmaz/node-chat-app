const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;
const middlewear = require("./middlewear/middlewear");
const mongoose = require("mongoose");
const session = require("express-session");
const multer = require("multer");

const authLogin = require("./routes/authLogin");
const authRegister = require("./routes/authRegister");
const authLogout = require("./routes/authLogout");
const profilePage = require("./routes/authProfile");
const posts = require("./routes/authPost");

//Serve public folder statically
app.use(express.static(path.join(__dirname, "public")));
//View Engine Setup
app.set("view engine", "ejs");
app.set("views", "views");

// bodyParser middlewear
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// sessions
app.use(
  session({
    secret: "chirp",
    resave: true,
    saveUninitialized: false,
  })
);

// connect app to mongoose
mongoose
  .connect("mongodb://localhost/users", {})
  .then(console.log("mongoDB connected"))
  .catch((err) => console.log(err));

app.use(function (req, res, next) {
  //Set the session user in locals so that we can use it in the views
  res.locals.loggedIn = req.session.user;
  next();
});
const multerStorage = multer.diskStorage({
  //Destination for image upload where it will be stored
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  //Filename for image upload
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${Date.now()}.${ext}`);
  },
});
//Setup multer package for uploading user profile image
const upload = multer({ storage: multerStorage });

//Mount Routing
app.use("/login", authLogin);
app.use("/register", authRegister);
app.use("/logout", authLogout);
app.use(
  "/profile",
  //Check if user is logged in
  middlewear.reqLogin,
  //For handling image upload
  upload.single("profilePic"),
  profilePage
);

app.use("/index", posts);
app.get("/", posts);

//Start server
app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});
