exports.reqLogin = (req, res, next) => {
  //If user is logged in, continue to next middlewear
  if (req.session && req.session.user) {
    return next();
  } else {
    //If user is not logged in, redirect to login page
    return res.redirect("/login");
  }
};