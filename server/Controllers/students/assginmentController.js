const Assignment = require("../../Models/student/assgiment.model");

const assginmentUpload = async (req, res) => {
  try {
    const { courseId, title, description } = req.body; 
    
    if (!req.file || !req.file.path) {
      return res.status(400).json({ success: false, message: "File upload failed" });
    }

    const imageUrl = req.file.path; 

    const newAssignment = new Assignment({
      courseId,
      title,
      description,
      file: imageUrl,
      userId:req.user.id
      
    });

    await newAssignment.save();

    res.status(201).json({
      success: true,
      message: "Assignment uploaded successfully",
      data: newAssignment,
    });

  } catch (error) {
    console.error("Error uploading assignment:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

module.exports = assginmentUpload;
