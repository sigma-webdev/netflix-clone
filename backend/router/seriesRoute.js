const express = require("express");
const {
  pong,
  httpCreateSeries,
  httpGetSeries,
  httpGetSeriesById,
  httpDeleteSeries,
} = require("../controller/seriesController");

// authentication and authorizations route
const jwtAuth = require("../middleware/jwtAuth");
const authAdmin = require("../middleware/authAdmin");
const checkUserSubscription = require("../middleware/ckeckUserSubscribtion");
const { httpDeleteById } = require("../controller/contentController");

const seriesRoute = express.Router();

// create series route
seriesRoute
  .route("/")
  .post(jwtAuth, authAdmin, httpCreateSeries)
  .get(jwtAuth, checkUserSubscription, httpGetSeries);

seriesRoute
  .route("/:seriesId")
  .get(jwtAuth, checkUserSubscription, httpGetSeriesById)
  .delete(jwtAuth, authAdmin, httpDeleteSeries);

module.exports = seriesRoute;
