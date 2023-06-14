const mongoose = require("mongoose");
const { Schema } = mongoose;

// TODO more required field movie likes and array of episode series
const contentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Content name is required"],
      minLength: [1, "Content movie name must be at least 5 characters"],
      maxLength: [40, "Content movie name must be less than 40 characters"],
    },
    description: {
      type: String,
      required: [true, "Content description is required"],
      minLength: [15, "Content description must be at least 15 characters"],
      maxLength: [250, "Content description must be less than 100 characters "],
    },
    cast: [String],
    categories: {
      type: String,
      enum: ["Movies", "TV shows"],
      required: true,
    },
    // TODO: pending
    likes: [String],

    genres: {
      type: String,
      enum: [
        "Action",
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
    creator: [String],
    rating: {
      type: String,
      required: true,
    },
    language: {
      type: String,
    },
    thumbnail: [
      {
        thumbnailUrl: {
          type: String,
          required: [true, "Thumbnail URL should be provided"],
        },
        thumbnailID: {
          type: String,
          required: [true, "Thumbnail Id should be provided"],
        },
      },
    ],
    trailer: [
      {
        trailerUrl: {
          type: String,
          required: [true, "trailer video link must be provided"],
        },
        trailerId: { type: String },
        // TODO: calculate length
        trailerDuration: { type: Number },
      },
    ],

    content: [
      {
        contentURL: {
          type: String,
          required: [true, "Content video link must be provided"],
        },
        contentID: {
          type: String,
          required: [true, "content ID must be provided"],
        },
        contentDuration: { type: Number },
      },
    ],

    episodes: [
      {
        episodeURL: {
          type: String,
        },
        episodeId: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

contentSchema.index("name");

const contentModel = mongoose.model("Content", contentSchema);
module.exports = contentModel;
