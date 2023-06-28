const asyncHandler = require("../middleware/asyncHandler");
const seriesModel = require("../model/seriesSchema");

const pong = (req, res) => {
  res.status(200).json({
    message: "ping",
  });
};

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
  const seriesObject = Content(seriesDetails);
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

module.exports = { httpCreateSeries, pong };
