const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please tell use your name"],
  },
  email: {
    type: String,
    required: [true, "please provide your email"],
    validate: [validator.isEmail, "please provide a valid email"],
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, "please provide a password"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "please provide a passwordConfirm"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: `password are not the same`,
    },
  },  role:{
    type: String,
    default: 'user',
    enum: ["user", "seller", "storekeeper", "admin"]
  },
  active : {
    type: Boolean, 
    default:true,
    select : false
  }
},{
  versionKey: false
});
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});
const User = mongoose.model("User", UserSchema);
module.exports = User;