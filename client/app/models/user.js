const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const validator = require("validator");

const usersSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a name"],
      minLength: [2, "minimum 2 letters"],
      maxLength: 30,
      lowercase: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email address"],
    },

    role: {
      type: String,
      enum: ["admin", "viewer"],
      default: "user",
    },

    password: {
      type: String,
      required: [true, "Please add a password!"],
      trim: true,
      validate: [validator.isStrongPassword, "Password is not strong enough!"],
    },

    profilePicture: {
      type: String,
      required: [true, "Please add a profile picture"],
      default: "https://randomuser.me/api/portraits/women/50.jpg",
      trim: true,
    },

    address: {
      type: String,
      default: "Nigeria",
      trim: true,
    },

    phone: {
      type: String,
      default: "+234",
    },
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving to database!
usersSchema.pre("save", async function (next) {
  // If the password is not modified, skip hashing
  if (!this.isModified("password")) {
    return next();
  }

  // Hash password
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

// Method to compare password during login
usersSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

const users = mongoose.models.users || mongoose.model("users", usersSchema);

export default users;
