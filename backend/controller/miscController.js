const asyncHandler = require("../middleware/asyncHandler");
const contentModel = require("../model/contentSchema");
const userModel = require("../model/userSchema");
const CustomError = require("../utils/customError");
const razorpay = require("../config/razorpayConfig.js");

const plans = ["PREMIUM", "STANDARD", "BASIC", "MOBILE", "NONE"];

const getUsersStatistics = asyncHandler(async (req, res, next) => {
  const users = await userModel.find({}).lean();

  const data = {
    plans: {},
  };

  data.usersCount = users.length;

  const usersWithActiveSubscription = users.filter((user) => {
    return user?.subscription?.status === "active";
  });

  data.usersCountWithActiveSubscription = usersWithActiveSubscription.length;

  // TODO: Add check for subscription active and user plan is "NONE"
  for (let user of users) {
    for (let plan of plans) {
      if (user.plan === plan) {
        data.plans[plan] = isNaN(data.plans[plan]) ? 1 : data.plans[plan] + 1;
      }
    }
  }

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "All users count",
    data,
  });
});

const getMoviesStatistics = asyncHandler(async (req, res, next) => {
  const moviesCount = await contentModel
    .find({ contentType: "Movie" })
    .lean()
    .countDocuments();

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "All movies count",
    data: {
      moviesCount: moviesCount,
    },
  });
});

const getSeriesStatistics = asyncHandler(async (req, res, next) => {
  const seriesCount = await contentModel
    .find({ contentType: "Series" })
    .lean()
    .countDocuments();

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "All series count",
    data: {
      seriesCount,
    },
  });
});

const getPaymentStatistics = asyncHandler(async (req, res, next) => {
  // Calculate the start and end dates for the desired month
  const currentDate = new Date();
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  // Convert the dates to the required format (YYYY-MM-DD)
  const startDate = startOfMonth.toISOString().split("T")[0];
  const endDate = endOfMonth.toISOString().split("T")[0];

  const from = req.query.startDate || startDate;
  const to = req.query.endDate || endDate;

  // try {
  const result = await razorpay.subscriptions.all({
    from,
    to,
  });

  if (!result) return next(new CustomError("No Subscription found", 404));

  return res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Successfully fetched the subscriptions",
    data: result,
  });
  // } catch (error) {
  //   return next(
  //     new CustomError(
  //       error.description || "Something went wrong, please try again later.",
  //       500
  //     )
  //   );
  // }
});

module.exports = {
  getUsersStatistics,
  getMoviesStatistics,
  getSeriesStatistics,
  getPaymentStatistics,
};
