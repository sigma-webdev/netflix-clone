const express = require("express");
const {
  httpCreateSeason,
  httpGetSeasons,
  httpGetSeasonById,
  httpDeleteSeason,
} = require("../controller/seasonController");

const seasonRouter = express.Router();

seasonRouter.route("/").post(httpCreateSeason).get(httpGetSeasons);

seasonRouter
  .route("/:seasonId")
  .get(httpGetSeasonById)
  .delete(httpDeleteSeason);

module.exports = seasonRouter;
