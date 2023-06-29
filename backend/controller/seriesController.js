const asyncHandler = require("../middleware/asyncHandler");
const seriesModel = require("../model/seriesSchema");
const CustomError = require("../utils/customError");

/********************
 * @httpCreateSeries
 * @route http://localhost:8081/api/v1/series/
 * @description  controller to create the series
 * @parameters {request body object}
 * @return { Object } content object
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

  // check for contentData
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
 * @return { Object } content object
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
 * @return { Object } content object
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
 * @return { Object } content object
 ********************/
const httpDeleteSeries = asyncHandler(async (req, res, next) => {
  const { seriesId } = req.params;

  const seriesData = await seriesModel.findById(seriesId);

  if (!seriesData) {
    return next(
      new CustomError("Series with the given Id does not exist.", 404)
    );
  }

  await seriesData.deleteOne();

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
const httpUpdateSeries = asyncHandler(async (req, res, next) => {});

module.exports = {
  httpCreateSeries,
  httpGetSeries,
  httpGetSeriesById,
  httpDeleteSeries,
};
