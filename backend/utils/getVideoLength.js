const { getVideoDurationInSeconds } = require("get-video-duration");
const getContentLength = async (url) => {
  let durationInSec;

  await getVideoDurationInSeconds(url)
    .then((duration) => {
      console.log("Video duration:", duration);
      durationInSec = duration;
    })
    .catch((error) => {
      // TODO: - throw error
      console.error("Error retrieving video duration:", error);
    });

  function FormatDuration(durationInSec) {
    const seconds = Math.round(durationInSec);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    const formattedTime = `${hours} hr ${minutes} min ${seconds % 60} sec`;
    return formattedTime;
  }
  // TODO: test me
  const formattedTime = FormatDuration(durationInSec);
  console.log(formattedTime);
  return formattedTime;
};

module.exports = getContentLength;
