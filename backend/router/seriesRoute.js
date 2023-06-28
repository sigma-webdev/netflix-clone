const express = require("express");
const { pong } = require("../controller/seriesController");
const seriesRoute = express.Router();

seriesRoute.route("/pong").get(pong);
