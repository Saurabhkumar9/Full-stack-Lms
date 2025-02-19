const fs = require("fs");
const path = require("path");
const Lesson = require("../../Models/LessonModels/lesson.model");
require("dotenv").config();

const addLesson = async (req, res) => {
  try {
    const { courseId, lessonTitle, lessonDescription } = req.body;

    if (!req.file) {
      return res.status(400).send({
        status: 0,
        message: "Lesson video is required",
      });
    }

    const PORT = process.env.PORT || 3306;
    const videoUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;

    if (!courseId || !lessonTitle || !lessonDescription) {
      try {
        fs.unlinkSync(path.join(__dirname, "../../uploads", req.file.filename));
      } catch (err) {
        console.error("Error deleting video:", err.message);
      }

      return res.status(400).send({
        status: 0,
        message: "All fields are required",
      });
    }

    const existingLesson = await Lesson.findOne({ lessonTitle });
    if (existingLesson) {
      try {
        fs.unlinkSync(path.join(__dirname, "../../uploads", req.file.filename));
      } catch (err) {
        console.error("Error deleting duplicate lesson video:", err.message);
      }

      return res.status(400).send({
        status: 0,
        message: "Lesson with the same title already exists in this course.",
      });
    }

    const newLesson = new Lesson({
      courseId,
      lessonTitle,
      lessonDescription,
      video: videoUrl,
      userId:req.user.id
    });

    await newLesson.save();

    return res.status(201).send({
      status: 1,
      message: "Lesson added successfully",
      lesson: newLesson,
    });
  } catch (error) {
    console.error("Server Error:", error.message);

    if (req.file) {
      try {
        fs.unlinkSync(path.join(__dirname, "../../uploads", req.file.filename));
      } catch (err) {
        console.error("Error deleting video on failure:", err.message);
      }
    }

    return res.status(500).send({
      status: 0,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = addLesson;
