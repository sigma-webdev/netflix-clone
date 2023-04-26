const express = require("express");
const app = express();
const authRouter = require("./router/authRouter");
const errorHandler = require("./middleware/errotHandler.js");

// database connection
require("./config/datebaseConnection");

// routes
authRouter.use("/api/v1/auth", authRouter);

// errorhandler

app.use(errorHandler);

module.exports = app;