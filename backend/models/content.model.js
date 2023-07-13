const mongoose = require("mongoose");
const { Schema } = mongoose;

const contentSchema = new Schema(
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

    /**
     * U - suitable for children and persons of all ages
     * U/A 7+  - suitable for children 7 and above under parental guidance for persons under age of 7
     * U/A 13+ - Suitable for persons aged 13 and above and under parental guidance for people under age of 13
     * U/A 16 + - Suitable for persons aged 16 and above and under parental guidance for people under age of 16
     * A - Content restricted to adults
     */
    maturityRating: {
      type: String,
      enum: ["U", "U/A 7+", "U/A 13+", "U/A 16+", "A"],
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
        "Malayalam",
      ],
    },
    thumbnail: [
      {
        thumbnailUrl: {
          type: String,
        },
        thumbnailId: {
          type: String,
          // required: [true, "Thumbnail Id should be provided"],
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

    contentMovie: {
      movieUrl: {
        type: String,
      },
      movieId: {
        type: String,
        // required: [true, "content ID must be provided"],
      },
      movieDuration: { type: Object },
    },

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

  { timestamps: true }
);

// mongoose pre method - to get likes and dislikes Count
contentSchema.pre("save", function (next) {
  this.likesCount = this.likes.length;
  this.disLikesCount = this.dislikes.length;

  return next();
});

// convert schema and change to Model and export
const contentModel = mongoose.model("Content", contentSchema);
module.exports = contentModel;
