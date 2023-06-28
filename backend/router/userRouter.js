const express = require("express");
const userRouter = express.Router();
const jwtAuth = require("../middleware/jwtAuth.js");
const checkUserSubscription = require("../middleware/ckeckUserSubscribtion.js");
const {
  getUser,
  getUsers,
  contentWatchHistory,
  getWatchContent,
  removeContentFromWatchHistory,
} = require("../controller/userController.js");

userRouter
  .route("/watchhistory/:contentId")
  .patch(jwtAuth, contentWatchHistory)
  .delete(jwtAuth, removeContentFromWatchHistory);
userRouter
  .route("/watchhistory")
  .get(jwtAuth, checkUserSubscription, getWatchContent);

userRouter.route("/").get(jwtAuth, getUsers);
userRouter.route("/:userId").get(jwtAuth, getUser);

module.exports = userRouter;
