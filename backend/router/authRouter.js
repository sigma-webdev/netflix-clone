const express = require("express");

const jwtAuth = require("../middleware/jwtAuth.js");

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

authRoute.post("/signup", signUp);
authRoute.post("/signin", signIn);
authRoute.post("/forgot-password", forgotPassword);
authRoute.post("/reset-password/:token", resetPassword);
authRoute.post("/user-exist", userExist);
authRoute.get("/user", jwtAuth, getUser);
authRoute.get("/signout", jwtAuth, signOut);

module.exports = authRoute;
