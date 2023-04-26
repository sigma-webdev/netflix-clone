const mongoose = require("mongoose");
const { Schema } = mongoose;

const contentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Content name is required"],
      minLength: [5, "Content movie name must be at least 30 characters"],
      minLength: [40, "Content movie name must be less than 40 characters"],
    },
    description: {
      type: String,
      required: [true, "Content description is required"],
      minLength: [15, "Content description must be at least 15 characters"],
      maxLength: [60, "Content description must be less than 60 characters "],
    },
    cast: {
      type: [String],
      required: true,
    },
    categories: {
      type: String,
      enum: ["Movies", "TV shows"],
      required: true,
    },
    genres: {
      type: String,
      enum: [
        "Action & Adventure",
        "Anime",
        "Children & Family",
        "Classic",
        "Comedies",
        "Documentaries",
        "Dramas",
        "Horror",
        "Romantic",
        "Sci-fi & Fantasy",
        "Sports",
        "Thrillers",
      ],
    },
    creator: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      enum: ["English", "Hindi", "Kannada", "Telegu", "Spanish", "Korean"],
    },
    trailer: {
      type: String,
    },
    video: {
      type: String,
      required: [true, "video link must be provided"],
    },
  },
  { timestamps: true }
);

const contentModel = mongoose.model("Content", contentSchema);
module.exports = contentModel;
