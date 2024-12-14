const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const validator = require("validator");

const mediaSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      minLength: [2, "Minimum 2 letters"],
      maxLength: [30, "Maximum 30 letters"],
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Please add a description"],
      minLength: [2, "Minimum 2 letters"],
      maxLength: [50, "Maximum 50 letters"],
      lowercase: true,
      trim: true,
    },

    imageUrl: {
      type: String,
      required: [true, "Please add an image URL"],
      validate: [validator.isURL, "Invalid URL format"],
    },

    categories: {
      type: [String],
      enum: ["publications", "gallery", "newsArticles"],
      required: [true, "Please select at least one category"],
    },
  },
  {
    timestamps: true,
  }
);

const Media = mongoose.models.Media || mongoose.model("Media", mediaSchema); // Media model
module.exports = Media;
