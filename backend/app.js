const express = require("express");
const app = express();
const authRouter = require("./router/authRouter");
const morgan = require("morgan");

const errorHandler = require("./middleware/errotHandler.js");
const contentRoute = require("./router/contentRouter");

// database connection
require("./config/datebaseConnection");

app.use(morgan("tiny"));

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/content", contentRoute);

// errorhandler

app.use(errorHandler);

module.exports = app;
