const PurchasedCourse = require("../../Models/CourseModels/PurchasedCourse.model");

const getPurchasedCourses = async (req, res) => {
  try {
    const userId = req.user.id; 
    
    const purchasedCourses = await PurchasedCourse.find({ userId }) // find() to get an array
      .populate({
        path: "courseId"
      });

    
    if (purchasedCourses.length === 0) {
      return res.status(404).json({ success: false, message: "No courses purchased yet." });
    }

    
    res.status(200).json({
      success: true,
      purchasedCourses,
    });
  } catch (error) {
    console.error("Error fetching purchased courses:", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

module.exports = getPurchasedCourses;
