const express = require("express");
const app = express();
const authRouter = require("./router/authRouter.js");
const errorHandler = require("./middleware/errorHandler.js");

// database connection
require("./config/databaseConnection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routes
app.use("/api/v1/auth", authRouter);
app.get("/", (req, res) => {
  return res.status(200).json({ data: "netflix server" });
});

// errorhandler
app.use(errorHandler);

module.exports = app;
