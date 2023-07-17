const express = require("express");
const userRouter = express.Router();
const jwtAuth = require("../middlewares/jwtAuth.js");
const checkUserSubscription = require("../middlewares/checkUserSubscription.js");

const {
  getUser,
  getUsers,
  addContentToWatchHistory,
  getWatchHistoryContents,
  removeContentFromWatchHistory,
  getWatchListContent,
  removeContentFromWatchList,
  addContentToWatchList,
} = require("../controllers/user.controller.js");
const authorizeRoles = require("../middlewares/authorizeRoles.js");

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
