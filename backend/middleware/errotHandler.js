const errorHandler = (error, req, res, next) => {
  const errorstatusCode = error.status;
  const errorMessage = error.errorMessage;

  res
    .status(errorstatusCode)
    .json({ success: false, message: errorMessage, data: {} });
};

module.exports = errorHandler;
