const express = require("express");
const userRouter = express.Router();
const jwtAuth = require("../middleware/jwtAuth.js");

const {
  getUser,
  getUsers,
  contentWatchHistory,
  getWatchContent
} = require("../controller/userController.js");

userRouter.route("/watchhistory").get(jwtAuth, getWatchContent);
userRouter
  .route("/watchhistory/:contentId")
  .patch(jwtAuth, contentWatchHistory);
userRouter.route("/").get(jwtAuth, getUsers);
userRouter.route("/:userId").get(jwtAuth, getUser);

module.exports = userRouter;
