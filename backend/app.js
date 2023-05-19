const express = require("express");
const app = express();
<<<<<<< HEAD
const authRouter = require("./router/authRouter");
const morgan = require("morgan");
const fileUpLoad = require("express-fileupload");

const errorHandler = require("./middleware/errotHandler.js");
const contentRoute = require("./router/contentRouter");
=======
const authRouter = require("./router/authRouter.js");
const errorHandler = require("./middleware/errorHandler.js");
>>>>>>> f0bf0c092da2de8ca7a60a678707d747d86cdb49

// database connection
require("./config/databaseConnection");

<<<<<<< HEAD
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
=======
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routes
app.use("/api/v1/auth", authRouter);
app.get("/", (req, res) => {
  return res.status(200).json({ data: "netflix server" });
});
>>>>>>> f0bf0c092da2de8ca7a60a678707d747d86cdb49

// errorhandler
app.use(errorHandler);

module.exports = app;
