const mongoose = require("mongoose");
const mediaSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add a title"],
      minLength: [2, "Minimum 2 letters"],
      maxLength: [20, "Maximum 30 letters"],
      lowercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please add a title"],
      minLength: [2, "Minimum 2 letters"],
      maxLength: [20, "Maximum 30 letters"],
      lowercase: true,
      trim: true,
    },

    school: {
      type: String,
      required: [true, "your school"],
      minLength: [2, "Minimum 2 letters"],
      maxLength: [25, "Maximum 30 letters"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "add your email"],

      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Please add a phone number"],
      minLength: [11, "Minimum 11 letters"],
      maxLength: [12, "Maximum 12 letters"],
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Please add a description"],
      minLength: [2, "Minimum 2 letters"],
      maxLength: [50, "Maximum 50 letters"],
      lowercase: true,
      trim: true,
    },

    ideaDescription: {
      type: String,
      required: [true, "Please add idea"],
      minLength: [2, "Minimum 2 letters"],
      maxLength: [50, "Maximum 50 letters"],
      lowercase: true,
      trim: true,
    },

    idea: {
      type: String,
      required: [true, "Please add a idea name"],
      minLength: [2, "Minimum 2 letters"],
      maxLength: [20, "Maximum 20 letters"],
      lowercase: true,
      trim: true,
    },

    gender: {
      type: [String],
      enum: ["Male", "Female", "other"],
      required: [true, "Please select at least one category"],
    },

    link1: {
      type: String,
      required: [true, "Please add a link to a website"],
    },
    link2: {
      type: String,
      required: [true, "Please add a link to documents"],
    },
  },
  {
    timestamps: true,
  }
);

const Form = mongoose.models.Form || mongoose.model("Form", mediaSchema); // Media model
module.exports = Form;
