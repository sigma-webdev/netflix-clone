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
contentRoute.route("/").post(httpPostContent).get(httpGetContent);
contentRoute
  .route("/:postId")
  .get(httpGetContentById)
  .delete(httpDeleteById)
  .put(httpUpdateById);

module.exports = contentRoute;
