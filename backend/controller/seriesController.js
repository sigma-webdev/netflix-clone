const asyncHandler = require("../middleware/asyncHandler");
const seriesModel = require("../model/seriesSchema");
const CustomError = require("../utils/customError");

const cloudinaryFileUpload = require("../utils/fileUpload.cloudinary");
const { cloudinaryFileDelete } = require("../utils/fileDelete.cloudinary");

const likeAndDislike = require("../utils/likeDislike");

/********************
 * @httpCreateSeries
 * @route http://localhost:8081/api/v1/series/
 * @description  controller to create the series
 * @parameters {request body object}
 * @return { Object } series object
 ********************/
const httpCreateSeries = asyncHandler(async (req, res, next) => {
  // get require field
  const {
    seriesTitle,
    seriesSummary,
    genres,
    releaseDate,
    cast,
    rating,
    language,
    director,
    originCountry,
  } = req.body;

  let seriesDetails = {
    seriesTitle,
    seriesSummary,
    genres,
    releaseDate,
    cast,
    rating,
    language,
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
  };

  // checking for missing fields
  const requiredFields = [
    "seriesTitle",
    "seriesSummary",
    "genres",
    "releaseDate",
    "cast",
    "rating",
    "language",
    "director",
    "originCountry",
  ];
  const missingRequiredFields = requiredFields.filter(
    (field) => !seriesDetails[field]
  );
  if (missingRequiredFields.length > 0) {
    // retrieve first missing fields and send the message
    const missingField = missingRequiredFields[0];
    return next(new CustomError(`Missing Field - ${missingField}`));
  }

  // create mongoose
  const seriesObject = seriesModel(seriesDetails);
  const seriesData = await seriesObject.save();

  // check for seriesFiles
  if (!seriesData) {
    return next(
      new CustomError(
        "Series data fail to save to database! Please try again",
        400
      )
    );
  }

  res.status(201).json({
    success: true,
    data: seriesData,
  });
});

/********************
 * @httpCreateSeries
 * @route http://localhost:8081/api/v1/series/
 * @description  controller to create the series
 * @parameters {request body object}
 * @return { Object } series object
 ********************/
const httpGetSeries = asyncHandler(async (req, res, next) => {
  const seriesData = await seriesModel.find();

  if (!seriesData) {
    return next(new CustomError("Series data not available!", 404));
  }

  return res.status(200).json({
    success: true,
    data: seriesData,
  });
});

/********************
 * @httpGetSeriesById
 * @route http://localhost:8081/api/v1/series/:seriesId
 * @description  controller to get a particular series with Id
 * @parameters { seriesId }
 * @return { Object } series object
 ********************/
const httpGetSeriesById = asyncHandler(async (req, res, next) => {
  const { seriesId } = req.params;

  const seriesData = await seriesModel.findById(seriesId);

  if (seriesData) {
    seriesData.trending += 1;
    await seriesData.save();
  }

  if (!seriesData) {
    return next(new CustomError("Invalid Series Id, or Series Not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Series fetched Successfully",
    data: seriesData,
  });
});

/********************
 * @httpDeleteSeries
 * @route http://localhost:8081/api/v1/series/:seriesId
 * @description  delete series controller
 * @parameters { seriesId }
 * @return { Object }  object
 ********************/
const httpDeleteSeries = asyncHandler(async (req, res, next) => {
  const { seriesId } = req.params;

  const seriesData = await seriesModel.findByIdAndDelete(seriesId);

  if (!seriesData) {
    return next(
      new CustomError("Series with the given Id does not exist.", 404)
    );
  }

  // TODO: to delete seasons and episode as well
  const { thumbnail, trailer } = seriesData;
  // perform delete in cloudinary
  if (seriesData) {
    if (trailer[0].trailerId) {
      cloudinaryFileDelete(trailer[0].trailerId, next);
    }

    if (thumbnail[0].thumbnailID) {
      cloudinaryFileDelete(thumbnail[0].thumbnailID, next, "image");
    }
  }

  res.status(200).json({
    success: true,
    message: "Series deleted successfully",
    data: seriesData,
  });
});

/********************
 * @httpUpdateSeries
 * @route http://localhost:8081/api/v1/series/:seriesId
 * @description  delete series controller
 * @parameters { seriesId }
 * @return { Object } updated object
 ********************/
const httpUpdateSeries = asyncHandler(async (req, res, next) => {
  const { seriesId } = req.params;
  const { body, files } = req;

  // check for the availability of series
  const seriesData = await seriesModel.findById(seriesId);

  if (!seriesData) {
    return next(new CustomError("Series not available for the provided Id! "));
  }

  // temp file storage
  let seriesFiles;

  if (files) {
    // check for pre-existing trailer
    if (
      files.trailer &&
      seriesData.trailer.length > 0 &&
      seriesData.trailer[0]?.trailerId
    ) {
      cloudinaryFileDelete(seriesData.trailer[0]?.trailerId, next);
    }

    // check for pre-existing thumbnail
    if (
      files.thumbnail &&
      seriesData.thumbnail.length > 0 &&
      seriesData.thumbnail[0]?.thumbnailID
    ) {
      cloudinaryFileDelete(seriesData.thumbnail[0]?.thumbnailID, next, "image");
    }

    seriesFiles = await cloudinaryFileUpload(files, next);
  }

  const updatedData = await seriesModel
    .findByIdAndUpdate(
      seriesId,
      { ...body, ...seriesFiles },
      {
        new: true,
        runValidators: true,
      }
    )
    .catch((error) => {
      // DELETE File passing particularId
      if (seriesFiles.trailer) {
        cloudinaryFileDelete(seriesFiles.trailer[0].trailerId, next);
      }

      if (seriesFiles.thumbnail) {
        cloudinaryFileDelete(
          seriesFiles.thumbnail[0].thumbnailID,
          next,
          "image"
        );
      }
      return next(new CustomError(`File not able to save!- ${error}`, 404));
    });

  if (!updatedData) {
    return next(
      new CustomError("Series fail to save to database! Please try again", 400)
    );
  }
  return res.status(200).json({
    success: true,
    message: "Series Updated successfully",
    data: updatedData,
  });
});

/********************
 * @httpUpdateSeries
 * @route http://localhost:8081/api/v1/series/:id/like
 * @description  delete series controller
 * @parameters { seriesId, userId }
 * @return { Object } series object with likes and dislike
 ********************/
const seriesLikeAndDislike = asyncHandler(async (req, res, next) => {
  const { seriesId, action } = req.params;
  const { id: userId } = req.user;

  const seriesData = await seriesModel.findById(seriesId);

  if (!seriesData) {
    return next(new CustomError("Series Data not available!", 404));
  }

  const message = likeAndDislike(action, userId, seriesData);

  await seriesData.save();
  return res.status(200).json({
    message: message,
    data: seriesData,
  });
});

module.exports = {
  httpCreateSeries,
  httpGetSeries,
  httpGetSeriesById,
  httpDeleteSeries,
  httpUpdateSeries,
  seriesLikeAndDislike,
};
