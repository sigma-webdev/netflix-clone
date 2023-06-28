const mongoose = require("mongoose");
const { Schema } = mongoose;

const seasonSchema = new Schema(
  {
    seasonName: {
      type: String,
      required: [true, "Season name is Required"],
      minLength: [5, "Season name must be at least 5 characters"],
      maxLength: [40, "Season name must be less than 40 characters"],
    },
    seasonSummary: {
      type: String,
      minLength: [15, "Content description must be at least 15 characters"],
      maxLength: [250, "Content description must be less than 250 characters "],
    },
    thumbnail: [
      {
        seasonPublicId: {
          type: String,
        },
        seasonSecureUrl: {
          type: String,
        },
      },
    ],
    episodes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Episode",
      },
    ],
  },

  { timestamps: true }
);

const seasonModel = mongoose.model("Season", seasonSchema);
module.exports = seasonModel;
