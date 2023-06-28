const mongoose = require("mongoose");
const { Schema } = mongoose;

const episodeSchema = new Schema(
  {
    title: {
      type: String,
      minLength: [5, "Episode  title must be at least 5 characters"],
      maxLength: [40, "Episode  title must be less than 40 characters"],
      required: [true, "Episode title is required"],
    },
    summary: {
      type: String,
      minLength: [10, "Episode description must be at least 10 characters"],
      maxLength: [100, "Episode description must be less than 100 characters"],
    },
    episodeThumbnail: [
      {
        episodePublicId: {
          type: String,
          required: [true, "Episode Public Id is required!"],
        },
        episodeSecureUrl: {
          type: String,
          required: [true, "Episode Secure Url is required"],
        },
      },
    ],
    episodeNumber: {
      type: Number,
      required: [true, "Episode Number should be provide"],
    },
  },
  { timestamps: true }
);

const episodeModel = mongoose.model("Episode", episodeSchema);
module.exports = episodeModel;
