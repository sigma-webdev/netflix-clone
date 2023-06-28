export const convertResponseToContentObject = (data, userId) => {
  let isLiked = false;
  let isDisliked = false;

  if (userId) {
    isLiked = data.likes.find((item) => item === userId) ? true : false;
    isDisliked = data.dislikes.find((item) => item === userId) ? true : false;
  }

  console.log(data.content[0].contentURL);

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
  };
};
