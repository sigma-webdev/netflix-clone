const asyncHandler = require("../middleware/asyncHandler.js");

const Content = require("../model/contentSchema.js");

const contentApi = asyncHandler(async (req, res) => {
  res.send("Pong");
});

module.exports = { contentApi };
