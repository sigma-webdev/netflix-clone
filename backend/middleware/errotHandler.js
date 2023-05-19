const errorHandler = (error, req, res, next) => {
  const errorstatusCode = error.statusCode || 500;
  const errorMessage = error.message || "Internal Server error :(";

  console.log(errorMessage);
  console.log(errorstatusCode);

  res.status(errorstatusCode).json({ success: false, message: errorMessage });
};

module.exports = errorHandler;
