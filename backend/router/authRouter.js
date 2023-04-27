const express = require("express");
const authRoute = express.Router();
const {
  signUp,
  signIn,
  forgotPassword
} = require("../controller/userController.js");

authRoute.post("/signup", signUp);
authRoute.post("/signin", signIn);
authRoute.post("/forgotPassword", forgotPassword);

module.exports = authRoute;