const getFormatedDuration = (contentDuration) => {
  let formatedTime = "";

  if (contentDuration.hours && contentDuration.hours !== 0) {
    formatedTime = `${contentDuration.hours} hr`;
  }

  if (contentDuration.minutes && contentDuration.minutes !== 0) {
    formatedTime = `${formatedTime} ${contentDuration.minutes} mins`;
  }

  if (contentDuration.seconds && contentDuration.seconds !== 0) {
    formatedTime = `${formatedTime} ${contentDuration.seconds} secs`;
  }

  return formatedTime;
};

export const convertResponseToContentObject = (data, userId) => {
  let isLiked = false;
  let isDisliked = false;

  if (userId) {
    isLiked = data.likes.find((item) => item === userId) ? true : false;
    isDisliked = data.dislikes.find((item) => item === userId) ? true : false;
  }

  return {
    contentId: data._id,
    name: data.name,
    description: data.description,
    cast: data.cast,
    director: data.director,
    thumbnailUrl: data.thumbnail[0].thumbnailUrl,
    trailerUrl: data.trailer[0].trailerUrl,
    contentUrl: data.content[0].contentURL,
    genres: data.genres,
    rating: data.rating,
    like: {
      isLiked: isLiked,
      isLikeLoading: false,
    },
    dislike: {
      isDisliked: isDisliked,
      isDisLikeLoading: false,
    },
    contentDuration: getFormatedDuration(data.content[0].contentDuration),
    releaseYear: new Date(data.releaseDate).getFullYear(),
  };
};
