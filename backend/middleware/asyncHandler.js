const asyncHandler = (fn) => (req, res, next) => {
  try {
    fn(req, res, next);
  } catch (error) {
    return next(err);
  }
};

module.exports = asyncHandler;
