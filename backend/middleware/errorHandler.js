const errorHandler = (error, req, res, next) => {
  const errorStatusCode = error.statusCode || 500;
  const errorMessage = error.message || "Internal Server error :(";

  if (error.code === 11000) {
    return res.status(errorStatusCode).json({
      statusCode: errorStatusCode,
      success: false,
      message: "Duplicate key error",
      data: null,
    });
  }

  if (error.name === "CastError") {
    return res.status(errorStatusCode).json({
      statusCode: errorStatusCode,
      success: false,
      message: `Resource not found, invalid ${error.path}`,
      data: null,
    });
  }

  const errorObject = {
    statusCode: errorStatusCode,
    success: false,
    message: errorMessage,
    data: null,
  };
  if (process.env.NODE_ENV === "development") {
    errorObject["stack"] = error.stack;
  }

  res.status(errorStatusCode).json(errorObject);
};

module.exports = errorHandler;
