const express = require("express");

const jwtAuth = require("../middleware/jwtAuth.js");

const authRoute = express.Router();

const {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
  userExist,
  signOut,
  getUser,
} = require("../controller/auth.controller.js");

authRoute.post("/signup", signUp);
authRoute.post("/signin", signIn);
authRoute.post("/forgot-password", forgotPassword);
authRoute.post("/reset-password/:token", resetPassword);
authRoute.post("/user-exist", userExist);
authRoute.get("/signout", jwtAuth, signOut);
authRoute.get("/user", jwtAuth, getUser);

module.exports = authRoute;
