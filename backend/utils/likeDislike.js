const likeAndDislike = (action, userId, content) => {
  const dislikeArr = content.dislikes;
  const likeArr = content.likes;
  let message = "";
  if (action === "like") {
    if (likeArr.includes(userId)) {
      likeArr.pop(userId);
      message = "removed like";
    } else if (dislikeArr.includes(userId)) {
      dislikeArr.pop(userId);
      likeArr.push(userId);
      message = " liked";
    } else {
      likeArr.push(userId);
      message = " liked";
    }
  }

  if (action === "dislike") {
    if (dislikeArr.includes(userId)) {
      message = "remove dislike";
      dislikeArr.pop(userId);
    } else if (likeArr.includes(userId)) {
      likeArr.pop(userId);
      dislikeArr.push(userId);
      message = "disliked";
    } else {
      dislikeArr.push(userId);
      message = "disliked";
    }
  }

  content.likes = likeArr;
  content.dislikes = dislikeArr;

  return message;
};

module.exports = likeAndDislike;
