const mongoose = require("mongoose");

// TODO more required field movie likes and array of episode series
const contentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Content name is required"],
      minLength: [5, "Content movie name must be at least 5 characters"],
      maxLength: [40, "Content movie name must be less than 40 characters"],
    },
    description: {
      type: String,
      required: [true, "Content description is required"],
      minLength: [15, "Content description must be at least 15 characters"],
      maxLength: [250, "Content description must be less than 250 characters "],
    },
    releaseDate: {
      type: Date,
      required: [true, "Content release date is required!"],
    },
    cast: [String],
    contentType: {
      type: String,
      enum: ["Movie", "Series"],
      required: true,
    },
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

    content: [
      {
        contentURL: {
          type: String,
        },
        contentID: {
          type: String,
          // required: [true, "content ID must be provided"],
        },
        contentDuration: { type: String },
      },
    ],
    // TODO: add series pending work
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
    originCountry: {
      type: String,
      enum: ["India", "USA", "Korea", "Japan", "German", "Spain"],
    },
    trending: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

contentSchema.index("name");

contentSchema.pre("save", function (next) {
  this.likesCount = this.likes.length;
  this.disLikesCount = this.dislikes.length;

  return next();
});

const contentModel = mongoose.model("Content", contentSchema);

module.exports = contentModel;
