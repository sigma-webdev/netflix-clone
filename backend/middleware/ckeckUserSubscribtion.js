const userModel = require("../model/userSchema.js");
const CustomError = require("../utils/customError.js");

async function checkUserSubscription(req, res, next) {
  const { id, role } = req.user;

  if (role !== "ADMIN") {
    const user = await userModel.findById(id, {
      "subscription.status": 1
    });

    const subscriptionStatus = user.subscription.status;
    if (user.subscription && subscriptionStatus !== "active") {
      return next(
        new CustomError("Please subscribe to access this route.", 403)
      );
    } else {
      next();
    }
  } else {
    next();
  }
}
module.exports = checkUserSubscription;
