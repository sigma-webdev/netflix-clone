const asyncHandler = require("../middleware/asyncHandler.js");
const CustomError = require("../utils/customError.js");

const Content = require("../model/contentSchema.js");
const getContentLength = require("../utils/getVideoLength.js");

const cloudinaryFileUpload = require("../utils/fileUpload.cloudinary.js");
const { cloudinaryFileDelete } = require("../utils/fileDelete.cloudinary.js");

/********************
 * @httpPostContent
 * @route http://localhost:8081/api/v1/content/
 * @description  controller to create the content
 * @parameters {request body object}
 * @return { Object } content object
 ********************/
const httpPostContent = asyncHandler(async (req, res, next) => {
  // get required field from body
  const {
    name,
    description,
    releaseDate,
    categories,
    genres,
    rating,
    language,
    cast,
    director,
    originCountry,
  } = req.body;

  // setting default value to file values
  let details = {
    name,
    description,
    releaseDate,
    categories,
    genres,
    rating,
    language,
    cast,
    director,
    originCountry,
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

  // (details.categories === "Movie") ?
  //   details.content[0].contentURL = "https://res.cloudinary.com/dp3qsxfn5/video/upload/v1687258296/Default_video_ikitm6.mp4"

  // get content video length
  if (details.content[0].contentURL) {
    const contentLength = await getContentLength(
      details.content[0].contentURL,
      next
    );
    details.content[0].contentDuration = contentLength;
  }

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
    "director",
    "originCountry",
  ];
  const missingRequiredFields = requiredFields.filter(
    (field) => !details[field]
  );
  if (missingRequiredFields.length > 0) {
    // retrieve first missing fields and send the message
    const missingField = missingRequiredFields[0];
    return next(new CustomError(`Missing Field - ${missingField}`));
  }

  // create mongoose
  const contentDetails = Content(details);

  const contentData = await contentDetails.save();

  // check for contentData
  if (!contentData) {
    return next(
      new CustomError("Content fail to save to database! Please try again", 400)
    );
  }

  res.status(201).json({
    success: true,
    data: contentData,
  });
});

/********************
 * @httpGetContent
 * @route http://localhost:8081/api/v1/content/
 * @description  controller to create the content
 * @parameters {string, object, enum, array}
 * @return { Object } content object
 ********************/
const httpGetContent = asyncHandler(async (req, res, next) => {
  const {
    search,
    category,
    genre,
    display,
    page,
    limit,
    latest,
    mostLikes,
    trending,
  } = req.query;
  const query = {};
  const PAGE = Number(page) || 1;
  const LIMIT = Number(limit) || 20;

  const startIndex = (PAGE - 1) * LIMIT;
  const endIndex = PAGE * LIMIT;

  // search content name
  if (search) query["name"] = { $regex: search, $options: "i" };

  // content Movies or Series
  if (category) {
    query["categories"] = new RegExp(category, "i");
  }

  // contents with specific genre
  if (genre) query["genres"] = new RegExp(genre, "i");

  // get latest move - release date -
  const sorting = {};
  if (latest) sorting["latestContent"] = { releaseDate: -1 };

  // get most-likes
  if (mostLikes) {
    sorting["likesCount"] = { likesCount: -1 };
  }
  // get most trending movies
  if (trending) {
    sorting["trending"] = { trending: -1 };
  }

  // pagination
  const totalContents = await Content.find(query).countDocuments();
  const result = {};
  if (endIndex < totalContents) {
    result.next = {
      pageNumber: PAGE + 1,
      limit: LIMIT,
    };
  }
  if (startIndex > 0) {
    result.previous = {
      pageNumber: PAGE - 1,
      limit: LIMIT,
    };
  }

  // display condition
  // TODO: Integrate middleware
  if (req.role === "ADMIN" && display) {
    query["display"] = display;
  } else if (req.role === "USER") {
    query["display"] = true;
  }

  // find all content and search all content
  result.contents = await Content.find(query)
    .skip(startIndex)
    .limit(LIMIT)
    // TODO: testing fail - work on it
    .sort(sorting.latestContent || sorting.likesCount || sorting.trending);

  // if no content available

  return res.status(200).json({
    success: true,
    data: result,
  });
});

/********************
 *
 * @httpGetContentById
 * @route http://localhost:8081/api/v1/content/id
 * @description  controller to create the content
 * @parameters {Object id}
 * @return { Object } content object
 ********************/
const httpGetContentById = asyncHandler(async (req, res, next) => {
  const { contentId } = req.params;

  const contentData = await Content.findById(contentId);

  if (contentData) {
    contentData.trending += 1;
    await contentData.save();
  }
  console.log("content Trending ===", contentData.trending);

  if (!contentData) {
    return next(
      new CustomError("Invalid Content Id, or Content Not found", 404)
    );
  }

  res.status(200).json({
    success: true,
    message: "Content fetched Successfully",
    data: contentData,
  });
});

/********************
 * @httpDeleteById
 * @route http://localhost:8081/api/v1/content/id
 * @description  controller to delete the content
 * @parameters {Object id}
 * @return { Object } content object
 ********************/
const httpDeleteById = asyncHandler(async (req, res, next) => {
  // extract id
  const { contentId } = req.params;

  // find content with id
  const contentData = await Content.findById(contentId);

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
        cloudinaryFileDelete(content[0].contentID, next);
      }

      if (trailer[0].trailerId) {
        cloudinaryFileDelete(trailer[0].trailerId, next);
      }

      if (thumbnail[0].thumbnailID) {
        cloudinaryFileDelete(thumbnail[0].thumbnailID, next, "image");
      }
    })
    .catch((error) => {
      return next(
        new CustomError(
          `Delete Fail, make sure valid id is provided - ${error}`,
          500
        )
      );
    });

  res.status(200).json({
    success: true,
    message: "Content deleted successfully",
    data: contentData,
  });
});

/********************
 * @httpUpdateById
 * @route http://localhost:8081/api/v1/content/id
 * @description  controller to update the content
 * @parameters {Object id}
 * @return { Object } content object
 ********************/
const httpUpdateById = asyncHandler(async (req, res, next) => {
  const { contentId } = req.params;
  const { body, files } = req;

  // check for the availability of content
  const contentData = await Content.findById(contentId);

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
      cloudinaryFileDelete(contentData.content[0]?.contentID, next);
    }

    if (
      files.trailer &&
      contentData.trailer.length > 0 &&
      contentData.trailer[0]?.trailerId
    ) {
      cloudinaryFileDelete(contentData.trailer[0]?.trailerId, next);
    }

    if (
      files.thumbnail &&
      contentData.thumbnail.length > 0 &&
      contentData.thumbnail[0]?.thumbnailID
    ) {
      cloudinaryFileDelete(
        contentData.thumbnail[0]?.thumbnailID,
        next,
        "image"
      );
    }

    contentFiles = await cloudinaryFileUpload(files, next);

    if (contentFiles.content) {
      if (contentFiles.content[0]?.contentID) {
        contentFiles.content[0].contentDuration = await getContentLength(
          contentFiles.content[0]?.contentURL,
          next
        );
      }
    }
  }

  const updatedData = await Content.findByIdAndUpdate(
    contentId,
    { ...body, ...contentFiles },
    {
      new: true,
      runValidators: true,
    }
  ).catch((error) => {
    // DELETE File passing particularId
    if (contentFiles.trailer) {
      cloudinaryFileDelete(contentFiles.trailer[0].trailerId, next);
    }
    if (contentFiles.content) {
      cloudinaryFileDelete(contentFiles.content[0].contentID, next);
    }
    if (contentFiles.thumbnail) {
      cloudinaryFileDelete(
        contentFiles.thumbnail[0].thumbnailID,
        next,
        "image"
      );
    }
    return next(new CustomError(`File not able to save!- ${error}`, 404));
  });

  if (!updatedData) {
    return next(
      new CustomError("Content fail to save to database! Please try again", 400)
    );
  }
  return res.status(200).json({
    success: true,
    message: "Content Updated successfully",
    data: updatedData,
  });
});

/********************
 * @contentLikes
 * @route http://localhost:8081/api/v1/content/:contentId/likes
 * @description  controller to like and dislike content
 * @parameters {user id , content id}
 * @return { Object } updated content object
 ********************/
/******* User likes ****** */
const contentLikes = asyncHandler(async (req, res, next) => {
  const { contentId, action } = req.params;
  const { id: userId } = req.user;

  const content = await Content.findById(contentId);

  if (!content) {
    return next(new CustomError("content is not available", 404));
  }

  const dislikeArr = content.dislikes;
  const likeArr = content.likes;
  let message = "";
  if (action === "like") {
    if (likeArr.includes(userId)) {
      likeArr.pop(userId);
      message = "removed like";
    } else if (dislikeArr.includes(userId)) {
      dislikeArr.pop(userId);
      likeArr.push(userId);
      message = " liked";
    } else {
      likeArr.push(userId);
      message = " liked";
    }
  }

  if (action === "dislike") {
    if (dislikeArr.includes(userId)) {
      message = "remove dislike";
      dislikeArr.pop(userId);
    } else if (likeArr.includes(userId)) {
      likeArr.pop(userId);
      dislikeArr.push(userId);
      message = "disliked";
    } else {
      dislikeArr.push(userId);
      message = "disliked";
    }
  }

  content.likes = likeArr;
  content.dislikes = dislikeArr;
  await content.save();
  return res.status(200).json({
    message: message,
    data: content,
  });
});

module.exports = {
  httpPostContent,
  httpGetContent,
  httpGetContentById,
  httpDeleteById,
  httpUpdateById,
  contentLikes,
};
