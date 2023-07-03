const errorHandler = (error, req, res, next) => {
  const errorStatusCode = error.statusCode || 500;
  const errorMessage = error.message || "Internal Server error :(";

  if (error.code === 11000) {
    return res.status(errorStatusCode).json({
      statusCode: errorStatusCode,
      success: false,
      message: "Duplicate key error",
    });
  }

  if (error.name === "CastError") {
    return res.status(errorStatusCode).json({
      success: false,
      message: `Resource not found, invalid ${error.path}`,
    });
  }

  res
    .status(errorStatusCode)
    .json({ success: false, message: errorMessage, stack: error.stack });
};

module.exports = errorHandler;
