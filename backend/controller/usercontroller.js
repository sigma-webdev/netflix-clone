const userModel = require("../model/userSchema.js");
const asyncHandler = require("../middleware/asyncHandler.js");
const CustomError = require("../utils/customError.js");

/******************************************************
 * @getUser
 * @route /api/v1/users/:userId
 * @description get the specific user
 * @params userId
 * @returns object with isUserExist boolean value
 ******************************************************/
const getUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  // get user from database using user id
  const user = await userModel.findById(userId);

  // if user is null return error message
  if (!user) {
    return next(new CustomError("User Not found", 404));
  }
  return res.status(200).json({
    statusCode: 200,
    success: true,
    message: "User detail the give Id fetched successfully",
    data: user,
  });
});

/******************************************************
 * @getUsers
 * @route /api/v1/users
 * @description get user base on query
 * @query page , limit , plan , subscription ,search
 * @returns array of user objects
 ******************************************************/

const getUsers = asyncHandler(async (req, res, next) => {
  const { page, limit, plan, subscribed, search } = req.query;

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

  // search content name
  if (search) query["email"] = { $regex: search, $options: "i" };

  const totalUsers = await userModel.find().countDocuments();

  const result = {};
  if (endIndex < totalUsers) {
    result.next = {
      pageNumber: PAGE + 1,
      limit: LIMIT,
    };
  }

  if (startIndex > 0) {
    result.previous = {
      pageNumber: PAGE - 1,
      limit: LIMIT,
    };
  }

  result.totalPages = Math.floor(totalUsers / LIMIT);
  result.users = await userModel
    .find(query)
    .skip(startIndex)
    .limit(LIMIT)
    .sort({ createdAt: 1 });
  return res.status(200).json({
    status: 200,
    success: true,
    message:
      result.users.length > 0 ? "Fetch users successfully" : "No user found",
    data: result,
  });
});

/******************************************************
 * @contentWatchHistory
 * @route /api/v1/auth/watchhistory/:contentId
 * @description add the contentId in watchhistory array, if contentId is not present
 * @params contentId
 * @returns watchhistory (array contentIds)
 ******************************************************/

const addContentToWatchHistory = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { contentId } = req.params;

  const { watchHistory } = await userModel.findById(userId, {
    watchHistory: 1,
  });

  const isContentIdPresent = watchHistory.includes(contentId);
  if (!isContentIdPresent) {
    watchHistory.push(contentId);
  }

  const result = await userModel
    .findByIdAndUpdate(
      userId,
      {
        watchHistory: watchHistory,
      },
      { new: true }
    )
    .select("watchHistory");

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: isContentIdPresent
      ? "Content already present in watch history"
      : "Added content to watch history",
    data: result.watchHistory,
  });
});

/******************************************************
 * @getWatchContent
 * @method delete
 * @route /api/v1/auth/watchhistory
 * @description get all content present in watchHistory base on contentId (populate)
 * @params contentId
 * @returns array of content object with specific fields
 ******************************************************/

const removeContentFromWatchHistory = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { contentId } = req.params;
  const result = await userModel
    .findByIdAndUpdate(
      userId,
      {
        $pull: { watchHistory: contentId },
      },
      { new: true }
    )
    .select("watchHistory");
  res.status(200).json({
    statusCode: 200,
    success: true,
    messaged: "Successfully remove Content from Watch history",
    data: result.watchHistory,
  });
});

/******************************************************
 * @getWatchHistoryContents
 * @route /api/v1/auth/watchhistory
 * @description get all content present in watchHistory base on contentId (populate)
 * @params contentId
 * @returns array of content object with specific fields
 ******************************************************/

const getWatchHistoryContents = asyncHandler(async (req, res, next) => {
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
      limit: LIMIT,
    };
  }

  if (startIndex > 0) {
    result.previous = {
      pageNumber: PAGE - 1,
      limit: LIMIT,
    };
  }
  result.totalPages = Math.floor(totalWatchContent / LIMIT);

  const user = await userModel.findById(userId).populate([
    {
      path: "watchHistory",
      select: "name thumbnail likesCount rating language categories genres",
      options: {
        skip: startIndex,
        limit: LIMIT,
      },
    },
  ]);

  result.contents = user.watchHistory;
  res.status(200).json({
    statusCode: 200,
    success: true,
    message:
      result.contents.length > 0
        ? "Fetch contents successfully"
        : "Content not found",
    data: result,
  });
});

/******************************************************
 * @addContentToWatchList
 * @method patch
 * @route /api/v1/auth/watch-history/:contentId
 * @description ref the contentId in watchList arr in the user data
 * @params contentId
 * @returns watch list (array of contentId)
 ******************************************************/

const addContentToWatchList = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { contentId } = req.params;

  const { watchList } = await userModel.findById(userId, {
    watchList: 1,
  });

  const isContentIdPresent = watchList.includes(contentId);
  if (!isContentIdPresent) {
    watchList.push(contentId);
  }

  const result = await userModel
    .findByIdAndUpdate(
      userId,
      {
        watchList: watchList,
      },
      { new: true }
    )
    .select("watchList");

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: isContentIdPresent
      ? "Content already present in watch history"
      : "Added content to watch history",
    data: result.watchList,
  });
});

/******************************************************
 * @removeContentFromWatchList
 * @method delete
 * @route /api/v1/auth/watch-history/:contentId
 * @description pull the contentId from watch list
 * @params contentId
 * @returns watch list (array of contentID)
 ******************************************************/

const removeContentFromWatchList = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { contentId } = req.params;
  const result = await userModel
    .findByIdAndUpdate(
      userId,
      {
        $pull: { watchList: contentId },
      },
      { new: true }
    )
    .select("watchList");
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Successfully removed the content from watch List",
    data: result.watchList,
  });
});

/******************************************************
 * @getWatchListContent
 * @route /api/v1/auth/watchhistory
 * @description get all content present in watchHistory base on contentId (populate)
 * @params contentId
 * @returns array of content object with specific fields
 *******************************************************/

const getWatchListContent = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { page, limit } = req.query;
  const PAGE = Number(page) || 1;
  const LIMIT = Number(limit) || 50;
  const startIndex = (PAGE - 1) * LIMIT;
  const endIndex = PAGE * LIMIT;

  const watchListArr = await userModel.findById(userId, "watchList");
  const totalWatchListContent = watchListArr.watchList.length;

  const result = {};
  if (endIndex < totalWatchListContent) {
    result.next = {
      pageNumber: 1,
      limit: LIMIT,
    };
  }

  if (startIndex > 0) {
    result.previous = {
      pageNumber: PAGE - 1,
      limit: LIMIT,
    };
  }

  result.totalPages = Math.floor(totalWatchListContent / LIMIT);

  const user = await userModel.findById(userId).populate([
    {
      path: "watchList",
      select: "name thumbnail likesCount rating language categories genres",
      options: {
        skip: startIndex,
        limit: LIMIT,
      },
    },
  ]);

  result.contents = user.watchList;
  res.status(200).json({
    statusCode: 200,
    success: true,
    message:
      result.contents.length > 0
        ? "Fetch contents successfully"
        : "Content not found",
    data: result,
  });
});

module.exports = {
  getUser,
  getUsers,
  addContentToWatchHistory,
  getWatchHistoryContents,
  removeContentFromWatchHistory,
  addContentToWatchList,
  removeContentFromWatchList,
  getWatchListContent,
};
