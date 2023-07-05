const asyncHandler = require("../middleware/asyncHandler");
const contentModel = require("../model/contentSchema");
const seasonModel = require("../model/seasonSchema");
const CustomError = require("../utils/customError");

/********************
 * @createSeason
 * @route http://localhost:8081/api/v1/contents/contentId
 * @description  controller to create the season
 * @parameters {request body object}
 * @return { Object } season object
 ********************/
const createSeason = asyncHandler(async (req, res, next) => {
  // get required field from body
  const { seasonNumber, seasonSummary } = req.body;

  // make sure series is available
  const { seriesId } = req.params;

  const seriesData = await contentModel.findById(seriesId);

  if (!seriesData) {
    return next(
      new CustomError(
        "Data not available for the provided data, for the provided Id",
        404
      )
    );
  }

  // check for the field
  if (!seasonNumber || !seasonSummary) {
    const message = seasonNumber ? "seasonSummary" : "seasonNumber";
    return next(new CustomError(`Missing Field - ${message}`, 400));
  }
  // read season and check for duplicate season number
  const seasons = await seasonModel.find();

  // handle season duplicate number
  let seasonPresent = false;
  for (const season of seasons) {
    if (season.seasonNumber === seasonNumber) {
      seasonPresent = true;
      return next(new CustomError("Season Value already exist!", 400));
    }
  }
  let seasonField = {
    seasonNumber,
    seasonSummary,
  };

  if (!seasonPresent) {
    const seasonDetails = seasonModel(seasonField);

    const seasonData = await seasonDetails.save();
    // check for season data
    if (!seasonData) {
      return next(
        new CustomError(
          "season fail to save to database! Please try again",
          400
        )
      );
    }

    ////// add the season to series //////
    if (!seriesData.contentSeries.includes(seasonData._id)) {
      seriesData.contentSeries.push(seasonData._id);
      await seriesData.save();
    } else {
      return next(new CustomError("Season already present!", 400));
    }

    return res.status(201).json({
      statusCode: 201,
      success: true,
      message: "season created",
      data: seasonData,
    });
  }
});

/********************
 * @getSeasons
 * @route http://localhost:8081/api/v1/contents/seriesId/seasons/
 * @description  controller to read all the seasons
 * @parameters {request body object}
 * @return { Object } season object
 ********************/
const getSeasons = asyncHandler(async (req, res, next) => {
  const { seriesId } = req.params;
  const seasons = await contentModel.findById(seriesId).populate([
    {
      path: "contentSeries",
    },
  ]);

  return res.status(200).json({
    statusCode: 200,
    message: "Seasons fetch successfully",
    success: true,
    data: seasons,
  });
});

/********************
 * @getSeasonsById
 * @route http://localhost:8081/api/v1/contents/seasons/seasonId
 * @description  controller to read single seasons with id
 * @parameters {request body object}
 * @return { Object } season object
 ********************/
const getSeasonsById = asyncHandler(async (req, res, next) => {
  const { seasonId } = req.params;

  const seasons = await seasonModel.findById(seasonId);

  if (!seasons) {
    return next(
      new CustomError(
        "Seasons data not able to fetch! for the given season Id",
        400
      )
    );
  }

  return res.status(200).json({
    statusCode: 200,
    message: "Seasons fetch successfully",
    success: true,
    data: seasons,
  });
});

/********************
 * @deleteSeason
 * @route http://localhost:8081/api/v1/contents/seasons/seasonId
 * @description  controller to delete single seasons with id
 * @parameters {season id}
 * @return { Object } season object
 ********************/
const deleteSeason = asyncHandler(async (req, res, next) => {
  const { seasonId } = req.params;

  const seasons = await seasonModel.findByIdAndDelete(seasonId);

  if (!seasons) {
    return next(new CustomError("Season Not found", 400));
  }

  return res.status(200).json({
    statusCode: 200,
    message: "deleted Successfully",
    success: true,
    data: seasons,
  });
});

/********************
 * @updateSeason
 * @route http://localhost:8081/api/v1/contents/seasons/seasonId
 * @description  controller to update single seasons with id
 * @parameters {season id}
 * @return { Object } season object
 ********************/
const updateSeason = asyncHandler(async (req, res, next) => {
  const { seasonId } = req.params;
  const { seasonNumber, seasonSummary } = req.body;

  // read season and check for duplicate season number
  const seasonData = await seasonModel.find();

  if (!seasonData) {
    return next(
      new CustomError("Not able to fetch data for the given Season Id", 404)
    );
  }

  // handle season duplicate number
  let seasonPresent = false;

  for (const season of seasonData) {
    if (season.seasonNumber === seasonNumber) {
      seasonPresent = true;
      return next(new CustomError("Season number already exist!", 400));
    }
  }

  let seasons;

  // if not duplicate
  if (!seasonPresent) {
    seasons = await seasonModel.findByIdAndUpdate(
      seasonId,
      { $set: { seasonNumber: seasonNumber, seasonSummary: seasonSummary } },
      { new: true }
    );
  }

  if (!seasons) {
    return next(new CustomError("Season not able to update", 400));
  }

  return res.status(200).json({
    statusCode: 200,
    message: "update Successfully",
    success: true,
    data: seasons,
  });
});

module.exports = {
  createSeason,
  getSeasons,
  getSeasonsById,
  deleteSeason,
  updateSeason,
};