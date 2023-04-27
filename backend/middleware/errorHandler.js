const errorHandler = (error, req, res, next) => {
  const errorStatusCode = error.status;
  const errorMessage = error.errorMessage;

  res
    .status(errorStatusCode)
    .json({ success: false, message: errorMessage, data: {} });
};

module.exports = errorHandler;
