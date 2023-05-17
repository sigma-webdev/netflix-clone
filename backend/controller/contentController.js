const asyncHandler = require("../middleware/asyncHandler.js");

const Content = require("../model/contentSchema.js");

/**
 * Testing route
 */
const contentApi = asyncHandler(async (req, res) => {
  res.send("Pong");
});

/**
 *  TODO: error handling of the input field and save to database
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns null
 */

const httpPostContent = asyncHandler(async (req, res, next) => {
  // handle trailer upload

  // handle content upload

  // trailer
  // video

  // trailer - id , link, duration

  // data pass
  let details = {
    name: req.body.name,
    description: req.body.description,
    cast: req.body.cast,
    categories: req.body.categories,
    genres: req.body.genres,
    creator: req.body.creator,
    rating: req.body.rating,
    language: req.body.language,
    trailer: req.body.trailer,
    content: req.body.content,
  };

  res.status(200).json({
    details,
  });
});

module.exports = { contentApi, httpPostContent };
