const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  lessonTitle: {
    type: String,
    required: true,
  },
  lessonDescription: {
    type: String,
    required: true,
  },
  video: {
    type: String, 
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;