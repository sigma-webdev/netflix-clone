const express = require("express");

const jwtAuth = require("../middleware/jwtAuth.js");
const {
  getUsersStatistics,
  getMoviesStatistics,
  getSeriesStatistics,
} = require("../controller/miscController.js");
const authorizeRoles = require("../middleware/authorizeRoles");

const miscRoute = express.Router();

miscRoute.get(
  "/admin/users-stats",
  jwtAuth,
  authorizeRoles("ADMIN"),
  getUsersStatistics
);
miscRoute.get(
  "/admin/movies-stats",
  jwtAuth,
  authorizeRoles("ADMIN"),
  getMoviesStatistics
);
miscRoute.get(
  "/admin/series-stats",
  jwtAuth,
  authorizeRoles("ADMIN"),
  getSeriesStatistics
);

module.exports = miscRoute;
