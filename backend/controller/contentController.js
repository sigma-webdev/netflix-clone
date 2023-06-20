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
  // get required field from body
  let details = {
    name: req.body.name,
    description: req.body.description,
    releaseDate: req.body.releaseDate,
    cast: req.body.cast,
    categories: req.body.categories,
    genres: req.body.genres,
    creator: req.body.creator,
    rating: req.body.rating,
    language: req.body.language,
    //default thumbnail value
    thumbnail: [
      {
        thumbnailUrl:
          "https://res.cloudinary.com/dp3qsxfn5/image/upload/v1687258494/default_thumbnail_mi4zwc.webp",
      },
    ],

    // default trailer value
    trailer: [
      {
        trailerUrl:
          "https://res.cloudinary.com/dp3qsxfn5/video/upload/v1687258296/Default_video_ikitm6.mp4",
      },
    ],
    // default content value
    content: [
      {
        contentURL:
          "https://res.cloudinary.com/dp3qsxfn5/video/upload/v1687258296/Default_video_ikitm6.mp4",
      },
    ],
  };

  // checking for missing fields
  const requiredFields = [
    "name",
    "description",
    "releaseDate",
    "categories",
    "genres",
    "rating",
    "language",
    "cast",
    "creator",
  ];
  const missingRequiredFields = requiredFields.filter(
    (field) => !details[field]
  );
  if (missingRequiredFields.length > 0) {
    // retrieve first missing fields and send the message
    const missingField = missingRequiredFields[0];
    return next(new CustomError(`Missing Field - ${missingField}`));
  }
  // file upload will be done in the update section

  const contentDetails = Content(details);

  const contentData = await contentDetails.save();

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
  const { postId } = req.params;

  const contentData = await Content.findById(postId);

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
  const { postId } = req.params;

  // find content with id
  const contentData = await Content.findById(postId);

  if (!contentData) {
    return next(
      new CustomError("Content with the given Id does not exist.", 404)
    );
  }

  const { thumbnail, trailer, content } = contentData;

  contentData
    .deleteOne()
    .then(() => {
      if (content[0].contentID) {
        cloudinaryFileDelete(content[0].contentID);
      }

      if (trailer[0].trailerId) {
        cloudinaryFileDelete(trailer[0].trailerId);
      }

      if (thumbnail[0].thumbnailID) {
        cloudinaryImageDelete(thumbnail[0].thumbnailID);
      }
    })
    .catch((error) => {
      return next(
        new CustomError(
          `Delete Fail, make sure valid id is provided - {error}`,
          500
        )
      );
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
  const { postId } = req.params;
  const { body, files } = req;

  // check for the availability of content
  const contentData = await Content.findById(postId);

  if (!contentData) {
    return next(new CustomError("Content not available for the provided Id! "));
  }

  // files temporary storage
  let contentFiles;

  if (files) {
    // delete pre-existing file
    if (
      files.content &&
      contentData.content.length > 0 &&
      contentData.content[0]?.contentID
    ) {
      cloudinaryFileDelete(contentData.content[0].contentID, next);
    }

    if (
      files.trailer &&
      contentData.trailer.length > 0 &&
      contentData.trailer[0]?.trailerId
    ) {
      cloudinaryFileDelete(contentData.trailer[0].trailerId, next);
    }

    if (
      files.thumbnail &&
      contentData.thumbnail.length > 0 &&
      contentData.thumbnail[0]?.thumbnailID
    ) {
      cloudinaryImageDelete(contentData.thumbnail[0]?.thumbnailID, next);
    }

    contentFiles = await cloudinaryFileUpload(files, next);
  }

  const updatedData = await Content.findByIdAndUpdate(
    postId,
    { ...body, ...contentFiles },
    {
      new: true,
      runValidators: true,
    }
  ).catch((error) => {
    // DELETE File passing particularId
    if (contentFiles.trailer) {
      cloudinaryFileDelete(contentFiles.trailer[0].trailerId);
    }
    if (contentFiles.content) {
      cloudinaryFileDelete(contentFiles.content[0].contentID);
    }
    if (contentFiles.thumbnail) {
      cloudinaryImageDelete(contentFiles.thumbnail[0].thumbnailID);
    }
    return next(new CustomError(`File not able to save!- ${error}`, 404));
  });

  if (!updatedData) {
    return next(
      new CustomError("Content fail to save to database! Please try again", 400)
    );
  }
  res.status(200).json({
    success: true,
    message: "Content Updated successfully",
    updatedData,
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
