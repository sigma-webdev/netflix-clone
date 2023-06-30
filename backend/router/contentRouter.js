const express = require("express");

const {
  httpPostContent,
  httpGetContent,
  httpGetContentById,
  httpDeleteById,
  httpUpdateById,
  contentLikes,
} = require("../controller/contentController");
const jwtAuth = require("../middleware/jwtAuth");
const authAdmin = require("../middleware/authorizeRoles");
const checkUserSubscription = require("../middleware/ckeckUserSubscribtion");

const contentRoute = express.Router();
// like & dislike routes --
contentRoute
  .route("/:contentId/:action")
  .patch(jwtAuth, checkUserSubscription, contentLikes);

// create and get content
contentRoute
  .route("/")
  .post(jwtAuth, authAdmin, httpPostContent)
  .get(jwtAuth, checkUserSubscription, httpGetContent);

// perform crud with the provided contentID
contentRoute
  .route("/:contentId")
  .get(jwtAuth, checkUserSubscription, httpGetContentById)
  .delete(jwtAuth, authAdmin, httpDeleteById)
  .put(jwtAuth, authAdmin, httpUpdateById);
module.exports = contentRoute;
