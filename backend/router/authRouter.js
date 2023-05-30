const express = require("express");
const authRoute = express.Router();
const {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
  userExist
} = require("../controller/userController.js");

authRoute.post("/signup", signUp);
authRoute.post("/signin", signIn);
authRoute.post("/forgotpassword", forgotPassword);
authRoute.post("/resetpassword/:token", resetPassword);
authRoute.post("/userexist", userExist);

module.exports = authRoute;
