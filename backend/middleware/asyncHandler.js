// this function will help to sent the error of  async task to error handler
const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};

module.exports = asyncHandler;
