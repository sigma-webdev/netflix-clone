const asyncHandler = require("../middleware/asyncHandler.js");

const Content = require("../model/contentSchema.js");
const CustomError = require("../utils/customError.js");
const cloudinaryFileUpload = require("../utils/fileUpload.cloudinary.js");

/**
 * Testing route
 */
const contentApi = asyncHandler(async (req, res) => {
  res.send("Pong");
});

/********************
 *  TODO: error handling of the input field and save to database
 * @httpPostContent
 * @route http://localhost:8081/api/v1/content/post
 * @description  controller to create the content
 * @parameters {string, object, enum, array}
 * @return { Object } content object
 ********************/
const httpPostContent = asyncHandler(async (req, res, next) => {
  let details = {
    name: req.body.name,
    description: req.body.description,
    cast: req.body.cast.split(","),
    categories: req.body.categories,
    genres: req.body.genres,
    creator: req.body.creator.split(","),
    rating: req.body.rating,
    language: req.body.language,
  };

  console.log("details - ", details);

  if (
    !details.name ||
    !details.description ||
    !details.cast ||
    !details.categories ||
    !details.genres ||
    !details.creator ||
    !details.rating ||
    !details.language
  ) {
    return next(new CustomError("Please fill the required field!", 400));
  }

  // get field data -
  const contentFiles = await cloudinaryFileUpload(req.files);

  // add the file details
  details.trailer = contentFiles.trailer;
  details.content = contentFiles.content;
  details.thumbnail = contentFiles.thumbnail;

  const contentDetails = Content(details);

  const contentData = await contentDetails.save();
  console.log("contentData- ", contentData);

  // save to db
  //  const contentData = await

  if (!contentData) {
    // TODO: handle delete files if fail to update
    return next(
      new CustomError("Content fail to save to database! Please try again", 400)
    );
  }

  res.status(201).json({
    success: true,
    contentData,
  });
});

const httpGetContent = asyncHandler(async (req, res, next) => {
  // find all content --
  const contents = await Content.find({});

  // if no content available
  if (!contents.length) {
    return next(new CustomError("Content not found!", 200));
  }

  res.status(200).json({
    success: true,
    message: "All contents ...",
    contents,
  });
});
module.exports = { contentApi, httpPostContent, httpGetContent };
