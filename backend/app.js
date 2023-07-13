const express = require("express");
const errorHandler = require("./middleware/errorHandler.js");

const app = express();

// packages
const morgan = require("morgan");
const fileUpLoad = require("express-fileupload");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// swagger api docs
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yaml");

const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// routes
const authRouter = require("./routes/auth.routes.js");
const paymentRouter = require("./routes/payment.routes.js");
const contentRoute = require("./routes/content.routes.js");
const userRouter = require("./routes/user.routes.js");
const miscRoute = require("./routes/misc.routes.js");

// database connection
require("./config/database.config.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.CLIENT],
    credentials: true,
  })
);

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

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

// Default catch all route - 404
app.all("*", (_req, res) => {
  res.status(404).json({
    statusCode: 404,
    success: false,
    message: "OOPS!!! 404 Not Found",
    data: null,
  });
});

// errorhandler
app.use(errorHandler);

module.exports = app;
