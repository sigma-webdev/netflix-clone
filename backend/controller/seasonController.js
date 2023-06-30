const asyncHandler = require("../middleware/asyncHandler");
const seasonModel = require("../model/seasonSchema");
const CustomError = require("../utils/customError");

/********************
 * @httpPostContent
 * @route http://localhost:8081/api/v1/seasons/
 * @description  controller to create the season
 * @parameters {request body object}
 * @return { Object } season object
 ********************/
const httpCreateSeason = asyncHandler(async (req, res, next) => {
  // get required field from body
  const { seasonNumber, seasonSummary } = req.body;

  // check for the field
  if (!seasonNumber || !seasonSummary) {
    const message = seasonNumber ? "seasonSummary" : "seasonNumber";
    return next(new CustomError(`Missing Field - ${message}`, 400));
  }
  // read season and check for duplicate season number
  const seasons = await seasonModel.find();

  // handle season duplicate number
  let seasonPresent = false;

  for (const i of seasons) {
    if (i.seasonNumber === seasonNumber) {
      console.log("true and throw error");
      seasonPresent = true;
      return next(new CustomError("Season Value already exist!", 400));
    }
  }

  let seasonDetails = {
    seasonNumber,
    seasonSummary,
  };

  if (!seasonPresent) {
    const seasonData = seasonModel(seasonDetails);

    const data = await seasonData.save();
    // check for season data
    if (!data) {
      return next(
        new CustomError(
          "season fail to save to database! Please try again",
          400
        )
      );
    }

    return res.status(201).json({
      statusCode: 201,
      success: true,
      message: "season created",
      data: data,
    });
  }
});

/********************
 * @httpGetSeasons
 * @route http://localhost:8081/api/v1/seasons/
 * @description  controller to read all the seasons
 * @parameters {request body object}
 * @return { Object } season object
 ********************/
const httpGetSeasons = asyncHandler(async (req, res, next) => {
  const seasons = await seasonModel.find();

  if (!seasons) {
    return next(new CustomError("Seasons data not able to fetch!", 500));
  }

  return res.status(200).json({
    statusCode: 200,
    message: "Seasons fetch successfully",
    success: true,
    data: seasons,
  });
});

module.exports = { httpCreateSeason, httpGetSeasons };
