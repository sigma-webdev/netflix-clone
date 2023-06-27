const CustomError = require("../utils/customError");

function authAdmin(req, res, next) {
  const role = req.user.role;
  if (role !== "ADMIN") {
    return next(new CustomError("Only Admin can access this route", 400));
  } else {
    next();
  }
}

module.exports = authAdmin;
