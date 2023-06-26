const { getVideoDurationInSeconds } = require("get-video-duration");
const CustomError = require("./customError");
const getContentLength = async (url, next) => {
  let durationInSec;

  await getVideoDurationInSeconds(url)
    .then((duration) => {
      durationInSec = duration;
    })
    .catch((error) => {
      return next(
        new CustomError(
          `Not able to get length of the provided content URL  - ${error}`,
          400
        )
      );
    });

  function FormatDuration(durationInSec) {
    const seconds = Math.round(durationInSec);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    const formattedTime = `${hours} hr ${minutes} min ${seconds % 60} sec`;
    return formattedTime;
  }

  const formattedTime = FormatDuration(durationInSec);
  console.log(formattedTime);
  return formattedTime;
};

module.exports = getContentLength;
