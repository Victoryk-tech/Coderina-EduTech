const mongoose = require("mongoose");
const validator = require("validator");
const formSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add a firstname"],
      minLength: [2, "Minimum 2 letters"],
      maxLength: [20, "Maximum 30 letters"],
      lowercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please add a lastname"],
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
      required: [true, "Add your email"],
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
    },

    phone: {
      type: String,
      required: [true, "Please add a phone number"],
      minLength: [11, "Minimum 11 characters"],
      maxLength: [12, "Maximum 12 characters"],
      lowercase: true,
      trim: true,
      validate: [
        validator.isMobilePhone,
        "Please provide a valid phone number",
      ],
    },
    address: {
      type: String,
      required: [true, "Please add a description"],
      minLength: [2, "Minimum 2 letters"],

      lowercase: true,
      trim: true,
    },

    ideaDescription: {
      type: String,
      required: [true, "Please add idea"],
      minLength: [2, "Minimum 2 letters"],

      lowercase: true,
      trim: true,
    },

    idea: {
      type: String,
      required: [true, "Please add a idea name"],
      minLength: [2, "Minimum 2 letters"],

      lowercase: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "female", "other"], // Allowed values
      required: true,
    },

    link1: {
      type: String,
      required: [true, "Please add a link to a website"],
      validate: [validator.isURL, "Please provide a valid URL"],
    },
    link2: {
      type: String,
      required: [true, "Please add a link to documents"],
      validate: [validator.isURL, "Please provide a valid URL"],
    },
  },
  {
    timestamps: true,
  }
);

const form = mongoose.models.form || mongoose.model("form", formSchema); // Media model
module.exports = form;
