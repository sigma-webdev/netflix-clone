const express = require("express");

const jwtAuth = require("../middlewares/jwtAuth.js");

const authRoute = express.Router();

const {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
  userExist,
  signOut,
  getUser,
} = require("../controllers/auth.controller.js");

authRoute.route("/signup").post(signUp);
authRoute.route("/signin").post(signIn);
authRoute.route("/forgot-password").post(forgotPassword);
authRoute.route("/reset-password/:token").post(resetPassword);
authRoute.route("/user-exist").post(userExist);
authRoute.route("/signout").get(jwtAuth, signOut);
authRoute.route("/user").get(jwtAuth, getUser);

module.exports = authRoute;
