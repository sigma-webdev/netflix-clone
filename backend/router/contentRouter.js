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
const authorizeRoles = require("../middleware/authorizeRoles");
const checkUserSubscription = require("../middleware/checkUserSubscription");
const {
  createSeason,
  getSeasons,
  getSeasonsById,
  updateSeason,
} = require("../controller/seasonController");

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

// ---- season routes ---- //
// create and read
contentRoute
  .route("/:seriesId/seasons")
  .post(jwtAuth, authorizeRoles("ADMIN"), createSeason)
  .get(
    jwtAuth,
    authorizeRoles("ADMIN", "USER"),
    checkUserSubscription,
    getSeasons
  );

// getSeasonById
contentRoute
  .route("/seasons/:seasonId")
  .get(
    jwtAuth,
    authorizeRoles("ADMIN", "USER"),
    checkUserSubscription,
    getSeasonsById
  )
  .put(jwtAuth, authorizeRoles("ADMIN"), updateSeason);

module.exports = contentRoute;
