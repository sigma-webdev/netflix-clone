const asyncHandler = require("../middleware/asyncHandler.js");

const Content = require("../model/contentSchema.js");

const cloudinaryFileUpload = require("../utils/fileUpload.cloudinary.js");
const {
  cloudinaryFileDelete,
  cloudinaryImageDelete,
} = require("../utils/fileDelete.cloudinary.js");
const CustomError = require("../utils/customerror.js");
cloudinaryImageDelete;

// TODO: handle delete, getById, and update and upload Episode

/**
 * Testing route
 */
const contentApi = asyncHandler(async (req, res) => {
  res.send("Pong");
});

/********************
 * @httpPostContent
 * @route http://localhost:8081/api/v1/content/posts
 * @description  controller to create the content
 * @parameters {request body object}
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

  // handling creator and cast data
  const castTemp = [];
  const creatorTemp = [];
  for (let i of details.cast) {
    castTemp.push(i.trim());
  }
  details.cast = castTemp;

  for (let i of details.creator) {
    creatorTemp.push(i.trim());
  }
  details.creator = creatorTemp;

  // checking for missing fields
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

  const contentFiles = await cloudinaryFileUpload(req.files);

  // add the file details
  details.trailer = contentFiles.trailer;
  details.content = contentFiles.content;
  details.thumbnail = contentFiles.thumbnail;

  // console.log("trailerId = ", details.trailer[0].trailerId);
  // console.log("contentId = ", details.content[0].contentID);
  // console.log("thumbnailId = ", details.thumbnail[0].thumbnailID);

  const contentDetails = Content(details);

  const contentData = await contentDetails.save().catch((error) => {
    // DELETE FILE
    cloudinaryFileDelete(details.trailer[0].trailerId);
    cloudinaryFileDelete(details.content[0].contentID);
    cloudinaryImageDelete(details.thumbnail[0].thumbnailID);

    return next(
      new CustomError("Content fail to save to database! Please try again", 400)
    );
  });
  // console.log("contentData- ", contentData);

  if (!contentData) {
    return next(
      new CustomError("Content fail to save to database! Please try again", 400)
    );
  }

  res.status(201).json({
    success: true,
    contentData,
  });
});

/********************
 * @httpGetContent
 * @route http://localhost:8081/api/v1/content/posts
 * @description  controller to create the content
 * @parameters {string, object, enum, array}
 * @return { Object } content object
 ********************/
const httpGetContent = asyncHandler(async (req, res, next) => {
  // find all content --
  const contents = await Content.find();
  console.log(contents);
  // if no content available
  if (!contents.length) {
    res.status(200).json({
      success: true,
      message: "Content Not found",
      contents,
    });
  }

  res.status(200).json({
    success: true,
    message: "All contents ...",
    contents,
  });
});

/********************
 *
 * @httpGetContentById
 * @route http://localhost:8081/api/v1/content/posts/id
 * @description  controller to create the content
 * @parameters {Object id}
 * @return { Object } content object
 ********************/
const httpGetContentById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const contentData = await Content.findById(id);

  if (!contentData) {
    return next(
      new CustomError("Invalid Content Id, or Content Not found", 404)
    );
  }

  res.status(200).json({
    success: true,
    message: "Content fetched Successfully",
    contentData,
  });
});

/********************
 * @httpDeleteById
 * @route http://localhost:8081/api/v1/content/posts/id
 * @description  controller to delete the content
 * @parameters {Object id}
 * @return { Object } content object
 ********************/
const httpDeleteById = asyncHandler(async (req, res, next) => {
  // extract id
  const { id } = req.params;

  // find content with id
  const contentData = await Content.findById(id);

  if (!contentData) {
    return next(
      new CustomError("Content with the given Id does not exist.", 404)
    );
  }

  const { thumbnail, trailer, content } = contentData;
  console.log("Thumbnail", thumbnail[0].thumbnailID);
  console.log("trailer", trailer[0].trailerId);
  console.log("content", content[0].contentID);

  contentData.deleteOne().then(() => {
    cloudinaryFileDelete(content[0].contentID);
    cloudinaryFileDelete(trailer[0].trailerId);
    cloudinaryImageDelete(thumbnail[0].thumbnailID);
  });

  res.status(200).json({
    success: true,
    message: "Content deleted successfully",
  });
});

/********************
 * @httpUpdateById
 * @route http://localhost:8081/api/v1/content/posts/id
 * @description  controller to update the content
 * @parameters {Object id}
 * @return { Object } content object
 ********************/
const httpUpdateById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const files = req.files;

  const contentData = await Content.findById(id);

  if (!contentData) {
    return next(new CustomError("content not found", 404));
  }

  // contentData = {
  //   name: req.body.name || contentData.name,
  //   description: req.body.description || contentData.description,
  //   cast: req.body.cast ? req.body.cast.split(",") : contentData.cast,
  //   categories: req.body.categories || contentData.categories,
  //   genres: req.body.genres || contentData.genres,
  //   creator: req.body.creator
  //     ? req.body.creator.split(",")
  //     : contentData.creator,
  //   rating: req.body.rating || contentData.rating,
  //   language: req.body.language || contentData.language,
  // };

  contentData.name = req.body.name || contentData.name;
  contentData.description = req.body.description || contentData.description;
  contentData.cast = req.body.cast || contentData.cast;
  contentData.categories = req.body.categories || contentData.categories;
  contentData.genres = req.body.genres || contentData.genres;
  contentData.creator = req.body.creator || contentData.creator;
  contentData.rating = req.body.rating || contentData.rating;
  contentData.language = req.body.language || contentData.language;

  if (files) {
    console.log("files", files);
    const contentFiles = await cloudinaryFileUpload(req.files);

    // add the file details
    contentData.trailer = contentFiles.trailer || contentData.trailer;
    contentData.content = contentFiles.content || contentData.content;
    contentData.thumbnail = contentFiles.thumbnail || contentData.thumbnail;
  }

  console.log("content------- -", contentData);

  // save the updated content
  await contentData.save();

  res.status(200).json({
    success: true,
    message: "Content Updated successfully",
    contentData,
  });
});

module.exports = {
  contentApi,
  httpPostContent,
  httpGetContent,
  httpGetContentById,
  httpDeleteById,
  httpUpdateById,
};
