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
const {
  createSeason,
  getSeasons,
  getSeasonsById,
  updateSeason,
  deleteSeason,
} = require("../controllers/season.controller.js");
const {
  createEpisode,
  getEpisode,
  episodeGetById,
  deleteEpisode,
  updateEpisode,
} = require("../controllers/episode.controller.js");

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

// getSeasonById and update
contentRoute
  .route("/seasons/:seasonId")
  .get(
    jwtAuth,
    authorizeRoles("ADMIN", "USER"),
    checkUserSubscription,
    getSeasonsById
  )
  .put(jwtAuth, authorizeRoles("ADMIN"), updateSeason);

// delete season
contentRoute
  .route("/:seriesId/seasons/:seasonId")
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
  .put(jwtAuth, authorizeRoles("ADMIN"), updateEpisode);

// delete episode
contentRoute
  .route("/:seasonId/episodes/:episodeId")
  .delete(jwtAuth, authorizeRoles("ADMIN"), deleteEpisode);

module.exports = contentRoute;
