const errorHandler = (error, req, res, next) => {
  const errorStatusCode = error.statusCode || 500;
  const errorMessage = error.message || "Internal Server error :(";

  // console.log("errorMessage --", errorMessage);
  // console.log("errorStatusCode--", errorStatusCode);
  console.log("Error --", error);
  res.status(errorStatusCode).json({ success: false, message: errorMessage });
};

module.exports = errorHandler;
