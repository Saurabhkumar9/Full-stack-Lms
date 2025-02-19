const Course = require("../../Models/CourseModels/course.model");

const singleCourseFind = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID
        if (!id) {
            return res.status(400).json({
                message: "Course ID is required",
            });
        }

        const findCourse = await Course.findById(id);

        if (!findCourse) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        res.status(200).json({
            message: "Course found successfully",
            course: findCourse,
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

module.exports =  singleCourseFind ;
