const mongoose = require("mongoose");
const { Schema } = mongoose;

const seriesSchema = new Schema(
  {
    seriesTitle: {
      type: String,
      minLength: [5, "Series title must be at least 5 characters"],
      maxLength: [40, "Series title must be less than 40 characters"],
      required: [true, "Series title is must be provide"],
    },
    seriesSummary: {
      type: String,
      minLength: [15, "Series summary must be at least 15 characters"],
      maxLength: [250, "Series summary must be less than 250 characters "],
    },
    genres: {
      type: [String],
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
        "Adventure",
      ],
    },
    releaseDate: {
      type: Date,
      required: [true, "Content release date is required!"],
    },
    cast: [String],
    director: {
      type: String,
      required: [true, "Director is required"],
    },
    rating: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      enum: [
        "English",
        "Hindi",
        "Korean",
        "Japan",
        "Tamil",
        "Spanish",
        "German",
      ],
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
    display: {
      type: Boolean,
      default: false,
    },
    originCountry: {
      type: String,
      enum: ["India", "USA", "Korea", "Japan", "German", "Spain"],
    },
    trending: {
      type: Number,
      default: 0,
    },
    seasons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Season",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likesCount: {
      type: Number,
      default: 0,
    },
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    disLikesCount: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: true }
);

const seriesModel = mongoose.model("Series", seriesSchema);

module.exports = seriesModel;
