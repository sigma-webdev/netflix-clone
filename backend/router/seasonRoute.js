const express = require("express");
const {
  httpCreateSeason,
  httpGetSeasons,
} = require("../controller/seasonController");

const seasonRouter = express.Router();

seasonRouter.route("/").post(httpCreateSeason).get(httpGetSeasons);

module.exports = seasonRouter;
