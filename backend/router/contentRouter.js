const express = require("express");

const {
  contentApi,
  httpPostContent,
  httpGetContent,
  httpGetContentById,
  httpDeleteById,
  httpUpdateById,
  contentLikes,
} = require("../controller/contentController");
const jwtAuth = require("../middleware/jwtAuth");

const contentRoute = express.Router();

contentRoute.route("/:contentId/:action").patch(jwtAuth, contentLikes);
contentRoute.route("/").post(httpPostContent).get(httpGetContent);
contentRoute
  .route("/:contentId")
  .get(httpGetContentById)
  .delete(httpDeleteById)
  .put(httpUpdateById);
module.exports = contentRoute;
