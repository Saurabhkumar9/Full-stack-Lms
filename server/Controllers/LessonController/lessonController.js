const Lesson = require("../../Models/LessonModels/lesson.model");

const fetchLesson = async (req, res) => {
  try {
    const { courseId } = req.params;

    const lessons = await Lesson.find({ courseId });

    if (!lessons.length) {
      return res.status(404).json({
        success: false,
        message: "No lessons found for this course",
      });
    }

    res.status(200).json({
      success: true,
      lessons,
    });
  } catch (error) {
    console.error("Error fetching lessons:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteLessons = async (req, res) => {
  try {
    const { id } = req.params;

    const lesson = await Lesson.findOne({ _id: id, userId: req.user.id });

    if (!lesson) {
      return res.status(404).json({
        message:
          "Lesson not found or you are not authorized to delete this lesson",
      });
    }

    const deletedLesson = await Lesson.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Lesson deleted successfully",
      deletedLesson,
    });
  } catch (error) {
    console.error("Error deleting lesson:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { fetchLesson, deleteLessons };
