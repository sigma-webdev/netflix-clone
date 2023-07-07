const express = require("express");
const errorHandler = require("./middleware/errorHandler.js");

const app = express();

// packages
const morgan = require("morgan");
const fileUpLoad = require("express-fileupload");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// routes
const authRouter = require("./router/auth.router.js");
const paymentRouter = require("./router/payment.router.js");
const contentRoute = require("./router/content.router");
const userRouter = require("./router/user.router.js");
const miscRoute = require("./router/misc.router.js");

// database connection
require("./config/database.config.js");

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  fileUpLoad({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/contents", contentRoute);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1", miscRoute);

app.get("/health-check", (req, res) => {
  return res.status(200).json({
    success: true,
    data: "Server is running",
  });
});

// errorhandler
app.use(errorHandler);

module.exports = app;
