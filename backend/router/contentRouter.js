const express = require("express");
const {
  contentApi,
  httpPostContent,
  httpGetContent,
  httpGetContentById,
  httpDeleteById,
  httpUpdateById
} = require("../controller/contentController");

const contentRoute = express.Router();

contentRoute.route("/ping").get(contentApi);
contentRoute.route("/posts").post(httpPostContent);
contentRoute.route("/posts").get(httpGetContent);
contentRoute.route("/posts/:id").get(httpGetContentById);
contentRoute.route("/posts/:id").delete(httpDeleteById);

// TODO: delete, update and search query --
contentRoute.route("/posts/:id").put(httpUpdateById);

module.exports = contentRoute;
