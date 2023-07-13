const userModel = require("../models/user.model.js");
const CustomError = require("../utils/customError.js");

// This middleware will check if user has active subscription or not, if not return error message
// admin can access the route

async function checkUserSubscription(req, res, next) {
  const { id, role } = req.user;

  try {
    if (role !== "ADMIN") {
      const user = await userModel.findById(id, {
        "subscription.status": 1,
      });

      if (user.subscription && user.subscription.status !== "active") {
        return next(
          new CustomError("Please subscribe to access this route.", 403)
        );
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (error) {
    return next(error);
  }
}
module.exports = checkUserSubscription;
