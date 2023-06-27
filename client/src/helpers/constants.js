export const Content = class {
  constructor(
    name,
    description,
    cast,
    director,
    thumbnailUrl,
    trailerUrl,
    geners,
    contentId,
    rating,
    isLiked,
    isDisked
  ) {
    this.contentId = contentId;
    this.name = name;
    this.description = description;
    this.cast = cast;
    this.director = director;
    this.thumbnailUrl = thumbnailUrl;
    this.trailerUrl = trailerUrl;
    this.geners = geners;
    this.rating = rating;
    this.isLiked = isLiked;
    this.isDisked = isDisked;
  }
};

export const convertResponseToContentObject = (
  name,
  description,
  cast,
  director,
  thumbnailUrl,
  trailerUrl,
  geners,
  contentId,
  rating,
  likes,
  dislikes,
  userId
) => {
  const isLiked = likes.find((item) => item === userId) ? true : false;
  const isDisliked = dislikes.find((item) => item === userId) ? true : false;

  return Content(
    contentId,
    name,
    description,
    cast,
    director,
    thumbnailUrl,
    trailerUrl,
    geners,
    rating,
    isLiked,
    isDisliked
  );
};
