const customError = require("../utils/customError.js");
const userModel = require("../model/userSchema.js");
const razorpay = require("../config/razorpayConfig.js");
const asyncHandler = require("../middleware/asyncHandler.js");

const buySubscription = asyncHandler(async (req, res, next) => {
  // Extracting ID from request obj
  const id = "64789b082f388ccff2e33eaa";
  const { planName } = req.body;

  console.log(planName);
  const {
    RAZORPAY_STANDARD_PLAN,
    RAZORPAY_BASIC_PLAN,
    RAZORPAY_PREMIUM_PLAN,
    RAZORPAY_MOBILE_PLAN
  } = process.env;

  const planID =
    "standard" === planName.toLowerCase()
      ? RAZORPAY_STANDARD_PLAN
      : null || "basic" === planName.toLowerCase()
      ? RAZORPAY_BASIC_PLAN
      : null || "premium" === planName.toLowerCase()
      ? RAZORPAY_PREMIUM_PLAN
      : null || "mobile" === planName.toLowerCase()
      ? RAZORPAY_MOBILE_PLAN
      : null;

  // Finding the user based on the ID
  const user = await userModel.findById(id);

  if (!user) {
    return next(new customError("Unauthorized, please login"));
  }

  // Checking the user role
  if (user.role === "ADMIN") {
    return next(new customError("Admin cannot purchase a subscription", 400));
  }

  // Creating a subscription using razorpay that we imported from the config/rasorpayConfig.js
  const subscription = await razorpay.subscriptions.create({
    plan_id: planID, // The unique plan ID
    customer_notify: 1, // 1 means razorpay will handle notifying the customer, 0 means we will not notify the customer
    total_count: 1 // 1 means it will charge only one month sub.
  });

  // Adding the ID and the status to the user account
  user.subscription.id = subscription.id;
  user.subscription.status = subscription.status;

  // Saving the user object
  await user.save();

  res.status(200).json({
    success: true,
    subscription_id: subscription.id
  });
});

module.exports = { buySubscription };
