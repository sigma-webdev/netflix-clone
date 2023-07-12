const express = require("express");

const {
  createContent,
  getContent,
  getContentById,
  deleteContentById,
  updateContentById,
  contentLikes,
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
    contentLikes
  );

// create and get content
// making sure the user is authenticated with jwtAuth //middleware function
// making sure the user is authorize with AuthorizeRoles //middleware function

contentRoute
  .route("/")
  .post(jwtAuth, authorizeRoles("ADMIN"), createContent)
  .get(
    jwtAuth,
    authorizeRoles("ADMIN", "USER"),
    checkUserSubscription,
    getContent
  );

// perform crud with the provided contentID
contentRoute
  .route("/:contentId")
  .get(
    jwtAuth,
    authorizeRoles("ADMIN", "USER"),
    checkUserSubscription,
    getContentById
  )
  .delete(jwtAuth, authorizeRoles("ADMIN"), deleteContentById)
  .put(jwtAuth, authorizeRoles("ADMIN"), updateContentById);
module.exports = contentRoute;
