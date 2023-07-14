const razorpay = require("../config/razorpay.config.js");
const asyncHandler = require("../middleware/asyncHandler.js");
const contentModel = require("../models/content.model.js");
const userModel = require("../models/user.model.js");

const plans = ["PREMIUM", "STANDARD", "BASIC", "MOBILE", "NONE"];

/**
 * @GET_USER_STATS
 * @DESCRIPTION Returns Object with usersCount, usersCountWithActiveSubscription, usersCountAccordingToPlanPurchased
 * @METHOD GET
 * @ROUTE /api/v1/admin/users-stats
 * @ACCESS ADMIN ONLY
 */
const getUsersStatistics = asyncHandler(async (req, res, next) => {
  const users = await userModel.find({}).lean();

  const data = {
    plans: {},
  };
  // total user count
  data.usersCount = users.length;

  const usersWithActiveSubscription = users.filter((user) => {
    return user?.subscription?.status === "active";
  });

  // active subscription
  data.usersCountWithActiveSubscription = usersWithActiveSubscription.length;

  // calculate for total, for specific plan
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

/**
 * @GET_MOVIE_STATS
 * @DESCRIPTION Returns Object with moviesCount
 * @METHOD GET
 * @ROUTE /api/v1/admin/movies-stats
 * @ACCESS ADMIN ONLY
 */
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

/**
 * @GET_USER_STATS
 * @DESCRIPTION Returns Object with seriesCount
 * @METHOD GET
 * @ROUTE /api/v1/admin/series-stats
 * @ACCESS ADMIN ONLY
 */
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

/**
 * @GET_USER_STATS
 * @DESCRIPTION Returns Object with seriesCount
 * @QUERY startDate, endDate (Should be in format, YYYY-MM-DD)
 * @METHOD GET
 * @ROUTE /api/v1/admin/sales-stats
 * @ACCESS ADMIN ONLY
 */
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
  // call razorpay instant
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
});

module.exports = {
  getUsersStatistics,
  getMoviesStatistics,
  getSeriesStatistics,
  getPaymentStatistics,
};
