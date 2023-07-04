const asyncHandler = require("../middleware/asyncHandler");
const contentModel = require("../model/contentSchema");
const userModel = require("../model/userSchema");

const plans = ["PREMIUM", "STANDARD", "BASIC", "MOBILE", "NONE"];

const getUsersStatistics = asyncHandler(async (req, res, next) => {
  const users = await userModel.find({}).lean();

  const data = {};

  data.usersCount = users.length;

  const usersWithActiveSubscription = users.filter((user) => {
    return user?.subscription?.status === "active";
  });

  data.usersCountWithActiveSubscription = usersWithActiveSubscription.length;

  for (let user of users) {
    data[user.plan] = 0;
    for (let plan of plans) {
      if (user.plan === plan) {
        data[plan] = data[plan] + 1;
      } else {
        data[plan] += 0;
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

module.exports = {
  getUsersStatistics,
  getMoviesStatistics,
  getSeriesStatistics,
};
