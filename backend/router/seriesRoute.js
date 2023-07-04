const express = require("express");
const {
  httpCreateSeries,
  httpGetSeries,
  httpGetSeriesById,
  httpDeleteSeries,
  httpUpdateSeries,
  seriesLikeAndDislike,
} = require("../controller/seriesController");

// authentication and authorizations route
const jwtAuth = require("../middleware/jwtAuth");
const authorizeRoles = require("../middleware/authorizeRoles");
const checkUserSubscription = require("../middleware/checkUserSubscription");

const seriesRoute = express.Router();

// create series route
seriesRoute
  .route("/")
  .post(jwtAuth, authorizeRoles("ADMIN"), httpCreateSeries)
  .get(jwtAuth, authorizeRoles("USER"), checkUserSubscription, httpGetSeries);

seriesRoute
  .route("/:seriesId")
  .get(
    jwtAuth,
    authorizeRoles("USER", "ADMIN"),
    checkUserSubscription,
    httpGetSeriesById
  )
  .delete(jwtAuth, authorizeRoles("ADMIN"), httpDeleteSeries)
  .put(jwtAuth, authorizeRoles("ADMIN"), httpUpdateSeries);

seriesRoute
  .route("/:seriesId/:action")
  .patch(jwtAuth, checkUserSubscription, seriesLikeAndDislike);

module.exports = seriesRoute;
