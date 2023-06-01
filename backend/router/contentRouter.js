const express = require("express");
const {
  contentApi,
  httpPostContent,
} = require("../controller/contentController");

const contentRoute = express.Router();

contentRoute.route("/ping").get(contentApi);
contentRoute.route("/post").post(httpPostContent);

module.exports = contentRoute;
