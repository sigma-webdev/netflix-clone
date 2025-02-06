// Convert duration to common format
const getFormatedDuration = (contentDuration) => {
  // console.log(contentDuration); // { hours: 0, minutes: 0, secs: 5 }

  if (contentDuration) {
    const { hours, minutes, secs } = contentDuration;
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m ${secs}s`;
  } else {
    return "0m 0s";
  }
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
