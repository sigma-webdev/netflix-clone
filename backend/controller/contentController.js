const asyncHandler = require("../middleware/asyncHandler.js");
const CustomError = require("../utils/customError.js");

const Content = require("../model/contentSchema.js");

const cloudinaryFileUpload = require("../utils/fileUpload.cloudinary.js");
const {
  cloudinaryFileDelete,
  cloudinaryImageDelete,
} = require("../utils/fileDelete.cloudinary.js");

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
    cast: req.body.cast ? req.body.cast.split(",") : undefined,
    categories: req.body.categories,
    genres: req.body.genres,
    creator: req.body.creator ? req.body.creator.split(",") : undefined,
    rating: req.body.rating,
    language: req.body.language,
  };

  // handling creator and cast data
  console.log("decodeee-------", decodeURI(req.body.cast));

  const castTemp = [];
  const creatorTemp = [];

  if (!details.creator) {
    return next(new CustomError("Creator field required", 400));
  }
  if (!details.cast) {
    return next(new CustomError("Cast field required", 400));
  }

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

  // file check
  // if (!req.files.trailer) {
  //   return next(new CustomError("Please add trailer file", 400));
  // }

  // if (!req.files.content) {
  //   return next(new CustomError("Please add content file", 400));
  // }

  // if (!req.files.thumbnail) {
  //   return next(new CustomError("Please add thumbnail file", 400));
  // }

  const contentFiles = await cloudinaryFileUpload(req.files);

  // add the file details
  details.trailer = contentFiles.trailer;
  details.content = contentFiles.content;
  details.thumbnail = contentFiles.thumbnail;

  const contentDetails = Content(details);

  const contentData = await contentDetails.save().catch((error) => {
    // DELETE FILE
    cloudinaryFileDelete(details.trailer[0].trailerId);
    cloudinaryFileDelete(details.content[0].contentID);
    cloudinaryImageDelete(details.thumbnail[0].thumbnailID);

    return next(
      new CustomError(`Content fail to save to database! ${error}`, 400)
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
  // console.log(contents);
  // if no content available
  if (!contents.length) {
    return res.status(200).json({
      success: true,
      message: "Content Not found",
      contents,
    });
  }

  return res.status(200).json({
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

  // handling creator and cast data
  const cast = req.body.cast ? req.body.cast.split(",") : "";
  const creator = req.body.creator ? req.body.creator.split(",") : "";
  const castTemp = [];
  const creatorTemp = [];
  for (let i of cast) {
    castTemp.push(i.trim());
  }

  for (let i of creator) {
    creatorTemp.push(i.trim());
  }

  contentData.name = req.body.name || contentData.name;
  contentData.description = req.body.description || contentData.description;
  contentData.cast = castTemp.length === 0 ? contentData.cast : castTemp;
  contentData.categories = req.body.categories || contentData.categories;
  contentData.genres = req.body.genres || contentData.genres;
  contentData.creator =
    creatorTemp.length === 0 ? contentData.creator : creatorTemp;
  contentData.rating = req.body.rating || contentData.rating;
  contentData.language = req.body.language || contentData.language;

  if (files) {
    // console.log("files", files);
    const contentFiles = await cloudinaryFileUpload(req.files);
    // console.log("ContentFiles ------------------ ", contentFiles);

    if (req.files.trailer) {
      contentData.trailer = contentFiles.trailer;
    }
    if (req.files.content) {
      contentData.content = contentFiles.content;
    }

    if (req.files.thumbnail) {
      contentData.thumbnail = contentFiles.thumbnail;
    }
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

/********************
 * @httpUpdateById
 * @route http://localhost:8081/api/v1/content/posts/query
 * @description  controller to update the content
 * @parameters {Object id}
 * @return { Object } content object
 ********************/
const searchByMovieName = () => {};

module.exports = {
  contentApi,
  httpPostContent,
  httpGetContent,
  httpGetContentById,
  httpDeleteById,
  httpUpdateById,
};
