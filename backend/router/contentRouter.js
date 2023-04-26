const express = require("express");
const { contentApi } = require("../controller/contentController");
const contentRoute = express.Router();

contentRoute.route("/ping").get(contentApi);

module.exports = contentRoute;
