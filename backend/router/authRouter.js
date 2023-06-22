const express = require("express");
const authRoute = express.Router();
const {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
  userExist,
  getUser,
  signOut,
} = require("../controller/userController.js");

const jwtAuth = require("../middleware/jwtAuth.js");

authRoute.post("/signup", signUp);
authRoute.post("/signin", signIn);
authRoute.post("/forgotpassword", forgotPassword);
authRoute.post("/resetpassword/:token", resetPassword);
authRoute.post("/userexist", userExist);
authRoute.get("/user", jwtAuth, getUser);
authRoute.get("/signout", jwtAuth, signOut);

module.exports = authRoute;
