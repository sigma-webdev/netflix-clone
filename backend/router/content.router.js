const express = require("express");

const {
  httpPostContent,
  httpGetContent,
  httpGetContentById,
  httpDeleteById,
  httpUpdateById,
  contentLikes,
} = require("../controller/content.controller.js");

const jwtAuth = require("../middleware/jwtAuth.js");
const authorizeRoles = require("../middleware/authorizeRoles.js");
const checkUserSubscription = require("../middleware/checkUserSubscription.js");
const {
  createSeason,
  getSeasons,
  getSeasonsById,
  updateSeason,
  deleteSeason,
} = require("../controller/season.controller.js");
const {
  createEpisode,
  getEpisode,
  episodeGetById,
  updateEpisode,
  deleteEpisode,
} = require("../controller/episode.controller.js");

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
  .put(jwtAuth, authorizeRoles("ADMIN"), updateSeason)
  .delete(jwtAuth, authorizeRoles("ADMIN"), deleteSeason);

//////// create/add episode ////////////
contentRoute
  .route("/:seriesId/:seasonId/episodes")
  .post(jwtAuth, authorizeRoles("ADMIN"), createEpisode);

// get episodes
contentRoute
  .route("/:seasonId/episodes")
  .get(
    jwtAuth,
    authorizeRoles("ADMIN", "USER"),
    checkUserSubscription,
    getEpisode
  );

// get episode by id
contentRoute
  .route("/episodes/:episodeId")
  .get(
    jwtAuth,
    authorizeRoles("ADMIN", "USER"),
    checkUserSubscription,
    episodeGetById
  )
  .put(jwtAuth, authorizeRoles("ADMIN"), updateEpisode)
  .delete(jwtAuth, authorizeRoles("ADMIN"), deleteEpisode);

module.exports = contentRoute;
