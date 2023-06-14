const errorHandler = (error, req, res, next) => {
  const errorStatusCode = error.statusCode || 500;
  const errorMessage = error.message || "Internal Server error :(";

  // console.log("errorMessage --", errorMessage);
  // console.log("errorStatusCode--", errorStatusCode);
  console.log("Error --", error);
  if (error.name === "castError") {
    return res.status(errorStatusCode).json({
      success: false,
      message: `Resource not found , Invalid ${error.path}`
    });
  }
  res.status(errorStatusCode).json({ success: false, message: errorMessage });
};

module.exports = errorHandler;
