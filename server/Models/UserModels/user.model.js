const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    password: {
      type: String,
      require: true,
      minlength: 5,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", Schema);
module.exports = User;
