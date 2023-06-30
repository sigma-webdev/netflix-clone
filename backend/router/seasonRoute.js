const express = require("express");
const {
  httpCreateSeason,
  httpGetSeasons,
  httpGetSeasonById,
  httpDeleteSeason,
  httpUpdateSeason,
} = require("../controller/seasonController");

const seasonRouter = express.Router();

seasonRouter.route("/").post(httpCreateSeason).get(httpGetSeasons);

seasonRouter
  .route("/:seasonId")
  .get(httpGetSeasonById)
  .delete(httpDeleteSeason)
  .put(httpUpdateSeason);

module.exports = seasonRouter;
