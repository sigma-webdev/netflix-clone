const express = require("express");
const {
  contentApi,
  httpPostContent,
  httpGetContent,
  httpGetContentById,
  httpDeleteById,
  httpUpdateById,
} = require("../controller/contentController");

const contentRoute = express.Router();

contentRoute.route("/ping").get(contentApi);
contentRoute.route("/posts").post(httpPostContent).get(httpGetContent);
contentRoute
  .route("/posts/:postId")
  .get(httpGetContentById)
  .delete(httpDeleteById)
  .put(httpUpdateById);

module.exports = contentRoute;
