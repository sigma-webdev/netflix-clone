const express = require("express");
const {
  contentApi,
  httpPostContent,
  httpGetContent,
} = require("../controller/contentController");

const contentRoute = express.Router();

contentRoute.route("/ping").get(contentApi);
contentRoute.route("/posts").post(httpPostContent).get(httpGetContent);

module.exports = contentRoute;
