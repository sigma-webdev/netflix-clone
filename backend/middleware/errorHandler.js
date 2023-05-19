const errorHandler = (error, req, res, next) => {
  const errorStatusCode = error.statusCode;
  const errorMessage = error.message;

  res.status(errorStatusCode).json({ success: false, message: errorMessage });
};

module.exports = errorHandler;
