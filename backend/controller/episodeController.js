const asyncHandler = require("../middleware/asyncHandler");
const contentModel = require("../model/contentSchema");

const episodeModel = require("../model/episodeSchema");
const seasonModel = require("../model/seasonSchema");
const CustomError = require("../utils/customError");
const { cloudinaryFileDelete } = require("../utils/fileDelete.cloudinary");
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

/********************
 * @episodeGetById
 * @route http://localhost:8081/api/v1/contents/episode/episodeId
 * @description  controller to get a specific episode
 * @parameters {request body object}
 * @return { ObjectId } episodeId
 ********************/
const episodeGetById = asyncHandler(async (req, res, next) => {
  const { episodeId } = req.params;

  const episode = await episodeModel.findById(episodeId);

  if (!episode) {
    return next(
      new CustomError(
        "Episode data not able to fetch! for the given season Id",
        400
      )
    );
  }

  return res.status(200).json({
    statusCode: 200,
    message: "Episode fetch successfully",
    success: true,
    data: episode,
  });
});

/********************
 * @updateEpisode
 * @route http://localhost:8081/api/v1/contents/episode/episodeId
 * @description  controller to update a specific episode
 * @parameters {request body object}
 * @return { ObjectId } episodeId
 ********************/
const updateEpisode = asyncHandler(async (req, res, next) => {
  const { episodeId } = req.params;

  const { body, files } = req;

  // make sure the episode data is present
  const episodeData = await episodeModel.findById(episodeId);

  if (!episodeData) {
    return next(
      new CustomError("Not able to fetch data for the given Episode Id", 404)
    );
  }

  // temp files storing
  let episodeFiles;
  // check files and delete the previous file and upload
  if (files) {
    // delete thumbnails
    if (files.episodeThumbnail && episodeData?.episodeThumbnail.length > 0) {
      episodeData?.episodeThumbnail.map((thumbObj) => {
        if (thumbObj.episodeVideoPublicId) {
          cloudinaryFileDelete(thumbObj.episodePublicId, next, "image");
        }
      });
    }
    // delete episode video
    if (files.episodeVideo && episodeData.episodeVideo?.episodeVideoPublicId) {
      cloudinaryFileDelete(
        episodeData.episodeVideo?.episodeVideoPublicId,
        next
      );
    }
    // after delete upload
    episodeFiles = await cloudinaryFileUpload(req.files, next);
  }

  if (episodeFiles.episodeVideo?.episodeVideoPublicId) {
    // get content length
    episodeFiles.episodeVideo.duration = await getContentLength(
      episodeFiles.episodeVideo?.episodeVideoPublicUrl,
      next
    );
  }
  // saving files ---
  const updatedEpisodeData = await episodeModel
    .findByIdAndUpdate(
      episodeId,
      {
        $set: { ...body, ...episodeFiles },
      },
      { new: true }
    )
    // if fail to save - delete the uploaded cloudinary files
    .catch((error) => {
      // DELETE File passing particularId
      if (episodeFiles.episodeVideo?.episodeVideoPublicId) {
        cloudinaryFileDelete(
          episodeFiles.episodeVideo?.episodeVideoPublicId,
          next
        );
      }
      if (episodeFiles.episodeThumbnail) {
        episodeThumbnail?.episodeThumbnail.map((thumbObj) =>
          cloudinaryFileDelete(thumbObj.episodePublicId, next, "image")
        );
      }

      return next(new CustomError(`File not able to save!- ${error}`, 500));
    });

  if (!updatedEpisodeData) {
    return next(
      new CustomError(
        "Episode fail to save/update to database! Please try again",
        400
      )
    );
  }
  return res.status(200).json({
    success: true,
    message: "Episode added/updated successfully",
    data: updatedEpisodeData,
  });
});

module.exports = { createEpisode, getEpisode, episodeGetById, updateEpisode };
