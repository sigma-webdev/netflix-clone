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
    releaseDate: {
      type: Date,
      required: [true, "Content release date required!"],
    },
    cast: [String],
    categories: {
      type: String,
      enum: ["Movies", "Series"],
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
        },
        thumbnailID: {
          type: String,
        },
      },
    ],
    trailer: [
      {
        trailerUrl: {
          type: String,
        },
        trailerId: { type: String },
      },
    ],

    content: [
      {
        contentURL: {
          type: String,
        },
        contentID: {
          type: String,
          // required: [true, "content ID must be provided"],
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
    display: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

contentSchema.index("name");

const contentModel = mongoose.model("Content", contentSchema);
module.exports = contentModel;
