const PurchasedCourse = require("../../Models/CourseModels/PurchasedCourse.model");

const buyCourse = async (req, res) => {
  try {
    const { courseId } = req.body; 
    const userId = req.user.id; 

    // console.log("User ID from Token:", userId);
    // console.log("Course ID from Request Body:", courseId);

    // Check if the course is already purchased
    const alreadyPurchased = await PurchasedCourse.findOne({ userId, courseId });

    if (alreadyPurchased) {
      return res.status(400).json({
        success: false,
        message: "You have already purchased this course.",
      });
    }

    //  Save purchase record
    const purchase = new PurchasedCourse({ courseId, userId });
    await purchase.save();

    res.status(200).json({ success: true, message: "Course purchased successfully!" });
  } catch (error) {
    console.error("Error in buyCourse API:", error);
    res.status(500).json({ success: false, message: "Internal Server Error. Course not added." });
  }
};

module.exports = buyCourse;
