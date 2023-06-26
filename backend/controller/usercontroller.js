const userModel = require("../model/userSchema.js");
const asyncHandler = require("../middleware/asyncHandler.js");
const { findById } = require("../model/contentSchema.js");

const getUser = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const result = await userModel.findById(userId);
  return res.status(200).json({ success: true, data: result });
});

const getUsers = asyncHandler(async (req, res, next) => {
  const { page, limit, plan, subscribed } = req.query;

  const PAGE = Number(page) || 1;
  const LIMIT = Number(limit) || 50;
  const startIndex = (PAGE - 1) * LIMIT;
  const endIndex = PAGE * LIMIT;
  const query = {};
  if (plan) query["plan"] = plan;
  if (subscribed && subscribed === "true") {
    query["subscribe.status"] = active;
  }
  if (subscribed) {
    query["subscribe.status"] = "active";
  }

  const totalUsers = await userModel.find().countDocuments();

  const result = {};
  if (endIndex < totalUsers) {
    result.next = {
      pageNumber: 1,
      limit: LIMIT
    };
  }

  if (startIndex > 0) {
    result.previous = {
      pageNumber: PAGE - 1,
      limit: LIMIT
    };
  }

  result.users = await userModel
    .find(query)
    .skip(startIndex)
    .limit(LIMIT)
    .sort({ createdAt: 1 });

  return res.status(200).json({ success: true, data: result });
});

const contentWatchHistory = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { contentId } = req.params;

  const { watchHistory } = await userModel.findById(userId, {
    watchHistory: 1
  });

  const isContentIdPresent = watchHistory.includes(contentId);
  if (!isContentIdPresent) {
    watchHistory.push(contentId);
  }
  const result = await userModel.findByIdAndUpdate(
    userId,
    {
      watchHistory: watchHistory
    },
    { new: true }
  );
  res.status(200).json({ success: true, data: result.watchHistory });
});

const getWatchContent = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { page, limit } = req.query;
  const PAGE = Number(page) || 1;
  const LIMIT = Number(limit) || 50;
  const startIndex = (PAGE - 1) * LIMIT;
  const endIndex = PAGE * LIMIT;

  const watchHistoryArr = await userModel.findById(userId, "watchHistory");
  const totalWatchContent = watchHistoryArr.watchHistory.length;

  const result = {};
  if (endIndex < totalWatchContent) {
    result.next = {
      pageNumber: 1,
      limit: LIMIT
    };
  }

  if (startIndex > 0) {
    result.previous = {
      pageNumber: PAGE - 1,
      limit: LIMIT
    };
  }

  const watchContent = await userModel.findById(userId).populate([
    {
      path: "watchHistory",
      select: "name thumbnail likesCount rating language categories genres",
      options: {
        skip: startIndex,
        limit: LIMIT
      }
    }
  ]);

  result.watchContent = watchContent.watchHistory;
  res.status(200).json({ success: true, data: result });
});

module.exports = { getUser, getUsers, contentWatchHistory, getWatchContent };
