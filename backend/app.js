const express = require("express");
const errorHandler = require("./middleware/errorHandler.js");

const app = express();

// packages
const morgan = require("morgan");
const fileUpLoad = require("express-fileupload");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// routes
const authRouter = require("./router/authRouter.js");
const paymentRouter = require("./router/paymentRouter.js");
const contentRoute = require("./router/contentRouter");
const userRouter = require("./router/userRouter.js");

// database connection
require("./config/databaseConnection");

app.use(
  cors({
    origin: [process.env.CLIENT],
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

app.get("/health-check", (req, res) => {
  return res.status(200).json({
    success: true,
    data: "Server is running",
  });
});

// errorhandler
app.use(errorHandler);

module.exports = app;
