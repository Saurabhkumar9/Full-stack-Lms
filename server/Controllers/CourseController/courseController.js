const Course = require("../../Models/CourseModels/course.model");
const Lesson = require("../../Models/LessonModels/lesson.model");

const addCourse = async (req, res) => {
  try {
    const { courseName, coursePrice, courseDescription, authorName } = req.body;

    if (!courseName || !coursePrice || !courseDescription || !authorName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const course = await Course.findOne({ courseName });
    if (course) {
      return res.status(400).json({ message: "Course name already exists." });
    }

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Image upload failed" });
    }

    const imageUrl = req.file.path.secure_url || req.file.path;

    const newCourse = new Course({
      courseName,
      coursePrice,
      courseDescription,
      authorName,
      image: imageUrl,
      userId: req.user.id,
    });

    await newCourse.save();

    return res.status(201).json({
      status: "success",
      message: "Course added successfully",
      imageUrl,
    });
  } catch (error) {
    console.error("Error in addCourse:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//all course fetch

const fetchCourses = async (req, res) => {
  try {
    // const courses = await Course.find({userId:req.user.id});
    const courses = await Course.find();

    if (!courses.length) {
      return res.status(404).json({ message: "No courses found" });
    }

    return res.status(200).json(courses);
  } catch (error) {
    console.error("Error finding courses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteCourses = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findOne({ _id: id, userId: req.user.id });
    if (!course) {
      return res.status(404).json({
        message:
          "Course not found or you are not authorized to delete this course",
      });
    }

    const lessonDeleteResult = await Lesson.deleteMany({ courseId: id });

    console.log(
      `${lessonDeleteResult.deletedCount} lessons deleted for course ${id}`
    );

    await Course.findByIdAndDelete(id);

    res.status(200).json({
      message: "Course and all related lessons deleted successfully",
      deletedLessons: lessonDeleteResult.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting course and lessons:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addCourse, fetchCourses, deleteCourses };
