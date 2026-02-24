const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      isLowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    confirmpassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords do not match",
      },
      select: false,
    },
    role: { type: String, enum: ["user", "admin", "seller"], default: "user" },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmpassword = undefined;
});
const User = mongoose.model("User", userSchema);
module.exports = User;
