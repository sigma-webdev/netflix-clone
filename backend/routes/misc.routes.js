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

miscRoute
  .route("/admin/users-stats")
  .get(jwtAuth, authorizeRoles("ADMIN"), getUsersStatistics);
miscRoute
  .route("/admin/movies-stats")
  .get(jwtAuth, authorizeRoles("ADMIN"), getMoviesStatistics);
miscRoute
  .route("/admin/series-stats")
  .get(jwtAuth, authorizeRoles("ADMIN"), getSeriesStatistics);
miscRoute
  .route("/admin/sales-stats")
  .get(jwtAuth, authorizeRoles("ADMIN"), getPaymentStatistics);

module.exports = miscRoute;
