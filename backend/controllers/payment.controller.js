const crypto = require("crypto");

const userModel = require("../models/user.model.js");
const razorpay = require("../config/razorpay.config.js");
const asyncHandler = require("../middlewares/asyncHandler.js");
const CustomError = require("../utils/customError.js");
const subscriptionPlanModel = require("../models/subscriptionPlan.model.js");

/******************************************************
 * @createSubscription
 * @method POST
 * @route /api/v1/payment/subscribe
 * @description create razorPay subscription base on plan
 * @body planName
 * @returns subscription ID
 ******************************************************/

const createSubscription = asyncHandler(async (req, res, next) => {
  // Extracting ID from request obj
  const { id } = req.user;
  const { planId } = req.params;

  const isPlanExist = await subscriptionPlanModel.findOne(
    {
      planId: planId,
    },
    { planId: 1 }
  );

  if (!isPlanExist) {
    return next(new CustomError("Please send valid planId", 400));
  }

  // Finding the user based on the ID
  const user = await userModel.findById(id);

  // Checking the user role
  if (user.role === "ADMIN") {
    return next(new CustomError("Admin cannot purchase a subscription", 400));
  }

  // Creating a subscription using razorpay that we imported from the config/rasorpayConfig.js
  try {
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId, // The unique plan ID
      customer_notify: 1, // 1 means razorpay will handle notifying the customer, 0 means we will not notify the customer
      total_count: 1, // 1 means it will charge only one month sub.
    });

    // Adding the ID and the status to the user account
    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;
  } catch (error) {
    return next(
      new CustomError(
        error.error.description ||
          "Error during creating RazorPay subscription",
        400
      )
    );
  }

  // Saving the user object
  await user.save();

  res.status(201).json({
    statusCode: 201,
    success: true,
    message: "Successfully created Subscription",
    data: { subscription_id: user.subscription.id },
  });
});

/******************************************************
 * @getRazorpayApiKey
 * @method POST
 * @route /api/v1/payment/rasorpaykey
 * @description send razorPay api key
 * @returns Razorpay Api Key
 ******************************************************/

const getRazorpayApiKey = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "RazorPay API key",
    data: {
      key: process.env.RAZORPAY_KEY_ID,
    },
  });
});

/******************************************************
 * @verifySubscription
 * @method GET
 * @route /api/v1/payment/verify-subscription
 * @description  verify user subscription
 * @body razorpayPaymentId, razorpaySubscriptionId, razorpaySignature, plan
 * @returns "Payment verified successfully" message
 ******************************************************/

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

  // await paymentModel.create({
  //   razorpayPaymentId,
  //   razorpaySubscriptionId,
  //   razorpaySignature,
  // });

  // Update the user subscription status to active (This will be created before this)
  user.subscription.status = "active";
  user.subscription.startDate = new Date(Date.now());
  user.subscription.expiryDate = new Date(
    Date.now() + 1000 * 60 * 60 * 24 * 30
  ); // 30 days

  user.plan = plan.toUpperCase();

  // Save the user in the DB with any changes
  await user.save();

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Payment verified successfully",
    data: null,
  });
});

/******************************************************
 * @createPlan
 * @method POST
 * @route /api/v1/payment/plan
 * @description  verify user subscription
 * @body razorpayPaymentId, razorpaySubscriptionId, razorpaySignature, plan
 * @returns "Payment verified successfully" message
 ******************************************************/

const createPlan = asyncHandler(async (req, res, next) => {
  const { planName, amount, description, active } = req.body;
  if (!planName || !amount || !description) {
    return next(
      new CustomError(
        "All fields are required. planName, amount, description",
        400
      )
    );
  }

  try {
    const planResponse = await razorpay.plans.create({
      period: "monthly",
      interval: 1,
      item: {
        name: planName.toUpperCase(),
        amount: amount * 100,
        currency: "INR",
        description: description,
      },
    });
    const planInfo = subscriptionPlanModel({
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
  } catch (error) {
    return next(
      new CustomError(
        error.error.description ||
          "Error occurred during creating subscription plan",
        500
      )
    );
  }
});

/******************************************************
 * @updatePlan
 * @method PATCH
 * @route /api/v1/payment/plan
 * @description  update active status of the plan
 * @params planDocumentId
 * @returns updated plan object
 ******************************************************/

const updatePlan = asyncHandler(async (req, res, next) => {
  const { planDocumentId } = req.params;

  let active = req.body.active;

  if (active === true || active === "true") {
    active = true;
  } else if (active === false || active === "false") {
    active = false;
  } else {
    return next(
      new CustomError("please provide valid value for active (true or false)")
    );
  }

  const result = await subscriptionPlanModel.findByIdAndUpdate(
    planDocumentId,
    {
      active,
    },
    { new: true }
  );

  return res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Successfully Updated the active status",
    data: result,
  });
});

/******************************************************
 * @deletePlan
 * @method DELETE
 * @route /api/v1/payment/plan
 * @description  delete the plan using planDocumentId
 * @params planDocumentId
 * @returns deleted plan object
 ******************************************************/

const deletePlan = asyncHandler(async (req, res, next) => {
  const { planDocumentId } = req.params;

  const result = await subscriptionPlanModel.findByIdAndDelete(planDocumentId);
  if (!result) return next(new CustomError("resource not found", 404));

  return res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Successfully deleted the plan",
    data: result,
  });
});

/******************************************************
 * @getPlans
 * @method GET
 * @route /api/v1/payment/plan
 * @description  get all plan
 * @params planDocumentId
 * @returns array of plan objects
 ******************************************************/

const getPlans = asyncHandler(async (req, res, next) => {
  const userRole = req.user.role;
  const { active } = req.query;
  const query = {};

  if (userRole === "ADMIN" && active) {
    query["active"] = active;
  } else if (userRole === "USER") {
    query["active"] = true;
  }

  const result = await subscriptionPlanModel.find(query);

  return res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Successfully fetch all plans",
    data: result,
  });
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
