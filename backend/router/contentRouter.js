const express = require("express");
const {
  contentApi,
  httpPostContent,
} = require("../controller/contentController");
const cloudinaryFileUpload = require("../utils/fileUplaod.cloudinary");

const contentRoute = express.Router();

contentRoute.route("/ping").get(contentApi);
contentRoute.route("/post").post(cloudinaryFileUpload, httpPostContent);

module.exports = contentRoute;
