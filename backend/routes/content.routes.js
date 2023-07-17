const express = require("express");

const {
  createContent,
  getContent,
  getContentById,
  deleteContentById,
  updateContentById,
  contentLikesAndDisLikes,
} = require("../controllers/content.controller.js");
const jwtAuth = require("../middlewares/jwtAuth.js");
const authorizeRoles = require("../middlewares/authorizeRoles.js");
const checkUserSubscription = require("../middlewares/checkUserSubscription.js");

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
