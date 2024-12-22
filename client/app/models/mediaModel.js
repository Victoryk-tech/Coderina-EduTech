const mongoose = require("mongoose");
const validator = require("validator");
const path = require("path");

const mediaSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      minLength: [2, "Minimum 2 letters"],
      maxLength: [30, "Maximum 30 letters"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Please add a description"],
      minLength: [2, "Minimum 2 letters"],
      maxLength: [300, "Maximum 300 letters"],
      trim: true,
    },

    category: {
      type: String,
      enum: ["gallery", "publications", "news articles"],
      required: [true, "Please select a category"],
    },

    images: [
      {
        url: {
          type: String,
          validate: {
            validator(value) {
              if (validator.isURL(value)) {
                return true;
              }

              const validImageExtensions = [
                ".jpg",
                ".jpeg",
                ".png",
                ".gif",
                ".bmp",
              ];
              const fileExtension = path.extname(value).toLowerCase();
              return validImageExtensions.includes(fileExtension);
            },
            message: "Invalid image URL or file format",
          },
        },
        description: {
          type: String,
          maxLength: [300, "Maximum 300 letters for image description"],
        },
      },
    ],

    body: {
      type: String,
      required: function () {
        return (
          this.category === "publications" || this.category === "news articles"
        );
      },
      minLength: [2, "Minimum 2 letters"],
      maxLength: [5000, "Maximum 5000 letters"],
      trim: true,
    },

    likes: {
      type: [String], // Array of user emails who liked the media
      default: [],
    },

    comments: [
      {
        email: {
          type: String,
          required: [true, "Email is required for commenting"],
          validate: [validator.isEmail, "Invalid email format"],
        },
        comment: {
          type: String,
          required: [true, "Comment is required"],
          minLength: [2, "Minimum comment length is 2 characters"],
          maxLength: [300, "Maximum comment length is 300 characters"],
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        replies: [
          {
            email: {
              type: String,
              required: [true, "Email is required for replying"],
              validate: [validator.isEmail, "Invalid email format"],
            },
            reply: {
              type: String,
              required: [true, "Reply is required"],
              minLength: [2, "Minimum reply length is 2 characters"],
              maxLength: [300, "Maximum reply length is 300 characters"],
            },
            timestamp: {
              type: Date,
              default: Date.now,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

const Media = mongoose.models.Media || mongoose.model("Media", mediaSchema);
module.exports = Media;
