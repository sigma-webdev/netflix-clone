const express = require("express");
const { pong, httpCreateSeries } = require("../controller/seriesController");
const jwtAuth = require("../middleware/jwtAuth");
const authAdmin = require("../middleware/authAdmin");

const seriesRoute = express.Router();

seriesRoute.route("/pong").get(pong);

// create series route
seriesRoute.route("/").post(jwtAuth, authAdmin, httpCreateSeries);

module.exports = seriesRoute;
