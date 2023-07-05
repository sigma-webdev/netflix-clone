const asyncHandler = require("../middleware/asyncHandler");
const contentModel = require("../model/contentSchema");

const episodeModel = require("../model/episodeSchema");
const seasonModel = require("../model/seasonSchema");
const CustomError = require("../utils/customError");
const cloudinaryFileUpload = require("../utils/fileUpload.cloudinary");
const getContentLength = require("../utils/getVideoLength");

/********************
 * @createEpisode
 * @route http://localhost:8081/api/v1/contents/seriesId/seasonId/episode
 * @description  controller to create / add episode
 * @parameters {request body object}
 * @return { ObjectId } seriesId and seasonId
 ********************/
const createEpisode = asyncHandler(async (req, res, next) => {
  const { seasonId, seriesId } = req.params;

  /// file check
  const { title, summary, episodeNumber } = req.body;

  const episodeDetails = {
    title,
    summary,
    episodeNumber,
    episodeThumbnail: [
      {
        episodeSecureUrl:
          "https://res.cloudinary.com/dp3qsxfn5/image/upload/v1687258494/default_thumbnail_mi4zwc.webp",
      },
    ],
  };

  //   // upload and add file
  //   let episodeFiles;
  //   if (req.files) {
  //     console.log(req.files, "/////////req.files>>>>>>>>>");
  //     episodeFiles = await cloudinaryFileUpload(req.files, next);
  //   }

  //   if (episodeFiles.thumbnail) {
  //     episodeDetails.thumbnail = episodeFiles.thumbnail;
  //   }

  //   if (episodeFiles.episodeVideo) {
  //     episodeDetails.episodeVideo = episodeFiles.episodeVideo;

  //     // get content length
  //     episodeDetails.episodeVideo.duration = await getContentLength(
  //       episodeFiles.episodeVideo?.episodeVideoPublicUrl,
  //       next
  //     );
  //   }

  //   console.log("episodeDetails -----------", episodeDetails);
  //// check for required field

  // checking for missing fields
  const requiredFields = [
    "title",
    "summary",
    "episodeNumber",
    "episodeThumbnail",
  ];
  const missingRequiredFields = requiredFields.filter(
    (field) => !episodeDetails[field]
  );
  if (missingRequiredFields.length > 0) {
    // retrieve first missing fields and send the message
    const missingField = missingRequiredFields[0];
    return next(new CustomError(`Missing Field - ${missingField}`, 400));
  }

  // make sure the selected series is available
  const seriesDetails = await contentModel.findById(seriesId);
  if (!seriesDetails) {
    return next(
      new CustomError("Series data not available for the given Id", 404)
    );
  }

  // make sure the selected season is available
  const seasonDetails = await seasonModel.findById(seasonId);
  if (!seasonDetails) {
    return next(
      new CustomError("Season data not available for the given Id", 404)
    );
  }

  // create episode mongoose object
  const episodeObject = new episodeModel(episodeDetails);
  const episodeData = await episodeObject.save();

  if (!episodeData) {
    return next(new CustomError("Episode Details fail to save or added", 500));
  }

  ////// add the episode to season //////
  if (!seasonDetails.episodes.includes(episodeData._id)) {
    seasonDetails.episodes.push(episodeData._id);
    await seasonDetails.save();
  } else {
    return next(new CustomError("episode already present!", 400));
  }

  return res.status(201).json({
    success: true,
    statusCode: 201,
    message: "Episode created and added",
    data: episodeData,
  });
});

/********************
 * @getEpisode
 * @route http://localhost:8081/api/v1/contents/seasonId/episode
 * @description  controller to get all episode
 * @parameters {request body object}
 * @return { ObjectId } seasonId
 ********************/
const getEpisode = asyncHandler(async (req, res, next) => {
  const { seasonId } = req.params;

  const episodes = await seasonModel.findById(seasonId).populate([
    {
      path: "episodes",
    },
  ]);

  if (!episodes) {
    return next(
      new CustomError("Data not available for the given season Id", 404)
    );
  }

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Data fetch with Episode successfully",
    data: episodes,
  });
});

module.exports = { createEpisode, getEpisode };
