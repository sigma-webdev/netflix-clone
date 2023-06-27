const express = require("express");
const app = express();

const morgan = require("morgan");
const fileUpLoad = require("express-fileupload");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler.js");
const cookieParser = require("cookie-parser");

// routes
const authRouter = require("./router/authRouter.js");
const paymentRouter = require("./router/paymentRouter.js");
const contentRoute = require("./router/contentRouter");
// database connection
require("./config/databaseConnection");

app.use(
  cors({
    origin: [process.env.CLIENT],
    credentials: true,
  })
);

app.use(morgan("tiny"));
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
app.use("/api/v1/payment", paymentRouter);
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
