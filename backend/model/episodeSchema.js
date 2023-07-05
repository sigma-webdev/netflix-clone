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
        },
        episodeSecureUrl: {
          type: String,
        },
      },
    ],
    episodeNumber: {
      type: Number,
      required: [true, "Episode Number should be provide"],
      unique: [true, "episodeNumber should be unique"],
    },
    episodeVideo: {
      episodeVideoPublicId: {
        type: String,
      },
      episodeVideoPublicUrl: {
        type: String,
      },
      duration: {
        type: Object,
      },
    },
  },
  { timestamps: true }
);

const episodeModel = mongoose.model("Episode", episodeSchema);
module.exports = episodeModel;
