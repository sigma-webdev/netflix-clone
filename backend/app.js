const express = require("express");
const app = express();

const authRouter = require("./router/authRouter");
const morgan = require("morgan");
const fileUpLoad = require("express-fileupload");

const contentRoute = require("./router/contentRouter");
const errorHandler = require("./middleware/errorHandler.js");

// database connection
require("./config/databaseConnection");

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpLoad({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/content", contentRoute);
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
