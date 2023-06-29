const express = require("express");
const userRouter = express.Router();
const jwtAuth = require("../middleware/jwtAuth.js");
const checkUserSubscription = require("../middleware/ckeckUserSubscribtion.js");
const {
  getUser,
  getUsers,
  addContentToWatchHistory,
  getWatchHistoryContents,
  removeContentFromWatchHistory,
  getWatchListContent,
  removeContentFromWatchList,
  addContentToWatchList,
} = require("../controller/userController.js");
const authAdmin = require("../middleware/authAdmin.js");

userRouter
  .route("/watch-history")
  .get(jwtAuth, checkUserSubscription, getWatchHistoryContents);
userRouter
  .route("/watch-history/:contentId")
  .patch(jwtAuth, addContentToWatchHistory)
  .delete(jwtAuth, removeContentFromWatchHistory);

userRouter.route("/watch-list").get(jwtAuth, authAdmin, getWatchListContent);
userRouter
  .route("/watch-list/:contentId")
  .patch(jwtAuth, authAdmin, addContentToWatchList)
  .delete(jwtAuth, authAdmin, removeContentFromWatchList);

userRouter.route("/").get(jwtAuth, getUsers);
userRouter.route("/:userId").get(jwtAuth, getUser);

module.exports = userRouter;
