const crypto = require("crypto");

const customError = require("../utils/customError.js");
const userModel = require("../model/userSchema.js");
const razorpay = require("../config/razorpayConfig.js");
const paymentModel = require("../model/paymentSchema.js");
const asyncHandler = require("../middleware/asyncHandler.js");
const CustomError = require("../utils/customError.js");
const SubscriptionPlanModel = require("../model/subscriptionPlanSchema.js");

// TODO: Add jsdoc for the controllers as added for other controllers

const createSubscription = asyncHandler(async (req, res, next) => {
  // Extracting ID from request obj
  const { id } = req.user;
  const { planName } = req.body;

  const {
    RAZORPAY_STANDARD_PLAN,
    RAZORPAY_BASIC_PLAN,
    RAZORPAY_PREMIUM_PLAN,
    RAZORPAY_MOBILE_PLAN,
  } = process.env;

  const planID =
    planName.toUpperCase() === "STANDARD"
      ? RAZORPAY_STANDARD_PLAN
      : null || planName.toUpperCase() === "BASIC"
      ? RAZORPAY_BASIC_PLAN
      : null || planName.toUpperCase() === "PREMIUM"
      ? RAZORPAY_PREMIUM_PLAN
      : null || planName.toUpperCase() === "MOBILE"
      ? RAZORPAY_MOBILE_PLAN
      : null;

  // FIXME: Add a check to make sure planID is never null

  // Finding the user based on the ID
  const user = await userModel.findById(id);

  if (!user) {
    return next(new customError("Unauthorized, please login"));
  }

  // Checking the user role
  if (user.role === "ADMIN") {
    return next(new customError("Admin cannot purchase a subscription", 400));
  }

  // FIXME: Below task is async, wrap it in trycatch to handle any potential errors
  // Creating a subscription using razorpay that we imported from the config/rasorpayConfig.js
  const subscription = await razorpay.subscriptions.create({
    plan_id: planID, // The unique plan ID
    customer_notify: 1, // 1 means razorpay will handle notifying the customer, 0 means we will not notify the customer
    total_count: 1, // 1 means it will charge only one month sub.
  });

  // FIXME: Make sure subscription did not return any result and then save the details in DB
  // Adding the ID and the status to the user account
  user.subscription.id = subscription.id;
  user.subscription.status = subscription.status;

  // Saving the user object
  await user.save();

  res.status(201).json({
    statusCode: 201,
    success: true,
    subscription_id: subscription.id,
    // TODO: Add a message?
  });
});

const getRazorpayApiKey = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    key: process.env.RAZORPAY_KEY_ID,
  });
});

const verifySubscription = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const { razorpayPaymentId, razorpaySubscriptionId, razorpaySignature, plan } =
    req.body;

  // Finding the user
  const user = await userModel.findById(id);

  // Getting the subscription ID from the user object
  const userSubscriptionId = user.subscription.id;

  // Generating a signature with SHA256 for verification purposes
  // Here the subscriptionId should be the one which we saved in the DB
  // razorpay_payment_id is from the frontend and there should be a '|' character between this and subscriptionId
  // At the end convert it to Hex value
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(`${razorpayPaymentId}|${userSubscriptionId}`)
    .digest("hex");

  // Check if generated signature and signature received from the frontend is the same or not
  if (generatedSignature !== razorpaySignature) {
    return next(new AppError("Payment not verified, please try again.", 400));
  }

  // If they match create payment and store it in the DB

  await paymentModel.create({
    razorpayPaymentId,
    razorpaySubscriptionId,
    razorpaySignature,
  });

  // Update the user subscription status to active (This will be created before this)
  user.subscription.status = "active";
  user.subscription.startDate = Date.now();
  user.subscription.expiryDate = new Date(
    Date.now() + 1000 * 60 * 60 * 24 * 30
  );
  user.plan = plan.toUpperCase();

  // Save the user in the DB with any changes
  await user.save();

  res.status(200).json({
    success: true,
    message: "Payment verified successfully",
  });
});

const createPlan = asyncHandler(async (req, res, next) => {
  const { planName, amount, description, active } = req.body;

  // FIXME: No validation for the inputs...

  const planResponse = await razorpay.plans.create({
    period: "monthly",
    interval: 1,
    item: {
      name: planName.toUpperCase(),
      amount: amount,
      currency: "INR",
      description: description,
    },
  });

  if (planResponse.error) {
    return next(
      new CustomError(
        planResponse.error.description ||
          "Error occurred during creating subscription plan",
        500
      )
    );
  }

  const planInfo = SubscriptionPlanModel({
    planName: planName.toUpperCase(),
    amount,
    description,
    active,
    planId: planResponse.id,
  });

  const result = await planInfo.save();

  return res.status(201).json({
    statusCode: 201,
    success: true,
    message: "Successfully created plan",
    data: result,
  });
});

const updatePlan = asyncHandler(async (req, res, next) => {
  const { planDocumentId } = req.params;

  let active = req.body.active;

  if (!active) return next(new CustomError("Active field is required"));

  if (active === true || active === "true") {
    active = true;
  } else if (active === false || active === "false") {
    active = false;
  } else {
    return next(
      new CustomError("please provide valid value for active (true or false)")
    );
  }

  const result = await SubscriptionPlanModel.findByIdAndUpdate(
    planDocumentId,
    {
      active,
    },
    { new: true }
  );

  return res.status(200).json({ success: true, data: result });
});

const deletePlan = asyncHandler(async (req, res, next) => {
  const { planDocumentId } = req.params;

  const result = await SubscriptionPlanModel.findByIdAndDelete(planDocumentId);

  // FIXME: We should check if the result is a success or not. Maybe invalid ID was provided by frontend or it does not exist in our DB

  return res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Successfully deleted the plan",
    data: null,
  });
});

const getPlans = asyncHandler(async (req, res, next) => {
  const result = await SubscriptionPlanModel.find();

  return res.status(200).json({ success: true, data: result });
});

module.exports = {
  createSubscription,
  getRazorpayApiKey,
  verifySubscription,
  createPlan,
  deletePlan,
  updatePlan,
  getPlans,
};
