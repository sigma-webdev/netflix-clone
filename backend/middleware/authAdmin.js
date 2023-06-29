const CustomError = require("../utils/customError");

// this middleware will check the user is admin or not ,if not return error message.
// Add this middleware in routes which you want only admin can access

function authAdmin(req, res, next) {
  const role = req.user.role;
  if (role !== "ADMIN") {
    return next(new CustomError("Only Admin can access this route", 400));
  } else {
    next();
  }
}

module.exports = authAdmin;
