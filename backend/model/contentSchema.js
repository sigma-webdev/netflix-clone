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
    cast: [
      {
        name: {
          type: String,
          required: [true, "At least one or more actor/actress must be added"],
        },
      },
    ],
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
    },
    trailer: [
      {
        trailerUrl: {
          type: String,
          required: [true, "video link must be provided"],
        },
        trailerId: { type: String },
        trailerDuration: { type: Number },
      },
    ],

    content: [
      {
        contentURL: {
          type: String,
          required: [true, "video link must be provided"],
        },
        contentID: {
          type: String,
          required: [true, "content ID must be provided"],
        },
        contentDuration: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

const contentModel = mongoose.model("Content", contentSchema);
module.exports = contentModel;
