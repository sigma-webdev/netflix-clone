// Convert duration to common format
const getFormatedDuration = (contentDuration) => {
  let formatedTime = "";

  if (contentDuration?.hours !== 0) {
    formatedTime = `${contentDuration.hours} hr`;
  }

  if (contentDuration?.minutes !== 0) {
    formatedTime = `${formatedTime} ${contentDuration.minutes} mins`;
  }

  if (contentDuration?.seconds !== 0) {
    formatedTime = `${formatedTime} ${contentDuration.seconds} secs`;
  }

  return formatedTime;
};

// Convert response to content object
export const convertResponseToContentObject = (data, userId) => {
  return {
    contentId: data?._id,
    name: data?.name,
    description: data?.description,
    cast: data?.cast,
    director: data?.director,
    thumbnailUrl: data?.thumbnail[0]?.thumbnailUrl,
    trailerUrl: data?.trailer[0]?.trailerUrl,
    contentUrl: data?.contentMovie?.movieUrl,
    countryOrigin: data?.originCountry,
    genres: data?.genres,
    rating: data?.maturityRating,
    isLiked: data?.likes?.find((item) => item === userId) ? true : false,
    isDisliked: data?.dislikes?.find((item) => item === userId) ? true : false,
    contentDuration: getFormatedDuration(data?.contentMovie?.movieDuration),
    releaseYear: new Date(data?.releaseDate)?.getFullYear(),
  };
};
