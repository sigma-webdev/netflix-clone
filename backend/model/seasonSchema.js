const mongoose = require("mongoose");
const { Schema } = mongoose;

const seasonSchema = new Schema(
  {
    seasonNumber: {
      type: Number,
      required: [true, "Season name is Required"],
      unique: true,
    },
    seasonSummary: {
      type: String,
      minLength: [15, "Content description must be at least 15 characters"],
      maxLength: [250, "Content description must be less than 250 characters "],
    },
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
