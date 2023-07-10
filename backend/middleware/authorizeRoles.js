const CustomError = require("../utils/customError.js");

// this middleware will check the user is authorized to use the route or not ,if not return error message.
// Add this middleware in routes which you want only specific user can access

// Middleware to check if user is authorized  or not
const authorizeRoles = (...roles) => {
  return (req, _res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new CustomError("you are not authorized to view this route", 403)
      );
    }

    next();
  };
};

module.exports = authorizeRoles;
