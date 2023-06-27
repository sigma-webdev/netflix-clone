const mongoose = require("mongoose");
const { Schema } = mongoose;

// TODO more required field movie likes and array of episode series
const contentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Content name is required"],
      minLength: [1, "Content movie name must be at least 5 characters"],
      maxLength: [40, "Content movie name must be less than 40 characters"]
    },
    description: {
      type: String,
      required: [true, "Content description is required"],
      minLength: [15, "Content description must be at least 15 characters"],
      maxLength: [250, "Content description must be less than 100 characters "]
    },
    releaseDate: {
      type: Date,
      required: [true, "Content release date required!"]
    },
    cast: [String],
    categories: {
      type: String,
      enum: ["Movies", "Series"],
      required: true
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel"
      }
    ],
    disLikesCount: {
      type: Number,
      default: 0
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
        "Adventure"
      ]
    },
    director: {
      type: String
    },
    rating: {
      type: String,
      required: true
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
        "German"
      ]
    },
    thumbnail: [
      {
        thumbnailUrl: {
          type: String,

          default:
            "https://res.cloudinary.com/ddvlwqjuy/image/upload/v1686918939/thumbnails/qu0ovdxpjqs0fv5d1eho.webp"
        },
        thumbnailID: {
          type: String
          // required: [true, "Thumbnail Id should be provided"],
        }
      }
    ],
    trailer: [
      {
        trailerUrl: {
          type: String,

          default:
            "https://res.cloudinary.com/ddvlwqjuy/image/upload/v1686919379/thumbnails/rx0rjj3e6knwkp3l9o9j.png"
          // required: [true, "trailer video link must be provided"],
        },
        trailerId: { type: String }
      }
    ],

    content: [
      {
        contentURL: {
          type: String,

          default:
            "https://res.cloudinary.com/ddvlwqjuy/image/upload/v1686919379/thumbnails/rx0rjj3e6knwkp3l9o9j.png"

          // required: [true, "Content video link must be provided"],
        },
        contentID: {
          type: String
          // required: [true, "content ID must be provided"],
        },
        contentDuration: { type: String }
      }
    ],
    // TODO: add series pending work
    episodes: [
      {
        episodeURL: {
          type: String
        },
        episodeId: {
          type: String
        }
      }
    ],
    display: {
      type: Boolean,
      default: false
    },
    originCountry: {
      type: String,
      enum: ["India", "USA", "Korean", "Japan", "German", "Spain"]
    },
    trending: {
      type: Number,
      default: 0
    }
  },

  { timestamps: true }
);

contentSchema.index("name");

contentSchema.pre("save", function (next) {
  this.likesCount = this.likes.length;
  this.disLikesCount = this.dislikes.length;

  return next();
});

const contentModel = mongoose.model("Content", contentSchema);
module.exports = contentModel;
