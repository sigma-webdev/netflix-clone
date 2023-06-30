const getFormatedDuration = (contentDuration) => {
  const formatedTime = "";

  if (contentDuration.hours != 0) {
    formatedTime.concat(`${contentDuration.hours} hr`);
  }

  if (contentDuration.minutes != 0) {
    formatedTime.concat(`${contentDuration.minutes} min`);
  }
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
    isLiked: isLiked,
    isDisliked: isDisliked,
    contentDuration: getFormatedDuration(data.content[0].contentDuration),
    releaseYear: new Date(data.content[0].releaseDate).getFullYear(),
  };
};
