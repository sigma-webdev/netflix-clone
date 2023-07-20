const express = require("express");
const userRouter = express.Router();
const jwtAuth = require("../middleware/jwtAuth.js");
const checkUserSubscription = require("../middleware/checkUserSubscription.js");

const {
  getUser,
  getUsers,
  addContentToWatchHistory,
  getWatchHistoryContents,
  removeContentFromWatchHistory,
  getWatchListContent,
  removeContentFromWatchList,
  addContentToWatchList,
} = require("../controller/user.controller.js");
const authorizeRoles = require("../middleware/authorizeRoles.js");

userRouter
  .route("/watch-history")
  .get(jwtAuth, checkUserSubscription, getWatchHistoryContents);
userRouter
  .route("/watch-history/:contentId")
  .patch(jwtAuth, addContentToWatchHistory)
  .delete(jwtAuth, removeContentFromWatchHistory);

userRouter
  .route("/watch-list")
  .get(jwtAuth, checkUserSubscription, getWatchListContent);
userRouter
  .route("/watch-list/:contentId")
  .patch(jwtAuth, authorizeRoles("ADMIN"), addContentToWatchList)
  .delete(jwtAuth, authorizeRoles("ADMIN"), removeContentFromWatchList);

userRouter.route("/").get(jwtAuth, authorizeRoles("ADMIN"), getUsers);
userRouter.route("/:userId").get(jwtAuth, authorizeRoles("ADMIN"), getUser);

module.exports = userRouter;
