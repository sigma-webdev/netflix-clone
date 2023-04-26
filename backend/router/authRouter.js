const express = require("express");
const authRoute = express.Router();

const { signUp, singIn } = require("../controller/usercontroller.js");

authRoute.post("/signin", singIn);
authRoute.post("/signup", signUp);

module.exports = authRoute;
