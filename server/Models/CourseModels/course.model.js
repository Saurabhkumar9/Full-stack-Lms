const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      require: true,
    },
    authorName: {
      type: String,
      require: true,
    },
    coursePrice: {
      type: String,
      require: true,
    },
    courseDescription: {
      type: String,
      require: true,
    },
    image:{
      type:String,
      require:true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("course", Schema);

module.exports = Course;
