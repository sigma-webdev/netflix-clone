const express = require("express");

const {
  httpPostContent,
  httpGetContent,
  httpGetContentById,
  httpDeleteById,
  httpUpdateById,
  contentLikesAndDisLikes,
} = require("../controller/content.controller.js");
const jwtAuth = require("../middleware/jwtAuth.js");
const authorizeRoles = require("../middleware/authorizeRoles.js");
const checkUserSubscription = require("../middleware/checkUserSubscription.js");

const contentRoute = express.Router();
// like & dislike routes --
contentRoute
  .route("/:contentId/:action")
  .patch(
    jwtAuth,
    authorizeRoles("ADMIN", "USER"),
    checkUserSubscription,
    contentLikesAndDisLikes
  );

// create and get content
contentRoute
  .route("/")
  .post(jwtAuth, authorizeRoles("ADMIN"), httpPostContent)
  .get(
    jwtAuth,
    authorizeRoles("ADMIN", "USER"),
    checkUserSubscription,
    httpGetContent
  );

// perform crud with the provided contentID
contentRoute
  .route("/:contentId")
  .get(
    jwtAuth,
    authorizeRoles("ADMIN", "USER"),
    checkUserSubscription,
    httpGetContentById
  )
  .delete(jwtAuth, authorizeRoles("ADMIN"), httpDeleteById)
  .put(jwtAuth, authorizeRoles("ADMIN"), httpUpdateById);
module.exports = contentRoute;
