const express = require("express");

const jwtAuth = require("../middlewares/jwtAuth.js");
const {
  getUsersStatistics,
  getMoviesStatistics,
  getSeriesStatistics,
  getPaymentStatistics,
} = require("../controllers/misc.controller.js");
const authorizeRoles = require("../middlewares/authorizeRoles.js");

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
miscRoute.get(
  "/admin/sales-stats",
  jwtAuth,
  authorizeRoles("ADMIN"),
  getPaymentStatistics
);

module.exports = miscRoute;
