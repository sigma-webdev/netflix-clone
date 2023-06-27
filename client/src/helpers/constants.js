export const convertResponseToContentObject = (data, userId) => {
  const isLiked = data.likes.find((item) => item === userId) ? true : false;
  const isDisliked = data.dislikes.find((item) => item === userId)
    ? true
    : false;

  return {
    contentId: data._id.toString(),
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
  };
};
