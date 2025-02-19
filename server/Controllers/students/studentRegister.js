const registerStudent = require("../../Models/student/registerStudent.model");

const newRegisterStudent = async (req, res) => {
  try {
    const { name, email, phone,  course } = req.body;

    if (!name || !email || !phone  || !course) {
      return res.status(404).json({
        status: false,
        message: " for register required all field.",
      });
    }

    const oldStudent = await registerStudent.findOne({ email });

    if (oldStudent) {
      return res.status(404).json({
        status: false,
        message: "student aleady register",
      });
    }
    if (!req.file || !req.file.path) {
        return res.status(400).json({ message: "Image upload failed" });
      }
  
      const imageUrl = req.file.path.secure_url || req.file.path;
  
    const newStudent = await registerStudent({
      name,
      email,
      phone,
      course,
      image: imageUrl,
      userId:req.user.id
    });

    await newStudent.save();

    return res.status(201).json({
      status: true,
      message: "student register success full",
      image:imageUrl,
      
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      meassage: "student not register.",
      error,
    });
  }
};







const getRegisterStudents = async (req, res) => {
  try {
    
    
    const userId=req.user.id
    console.log(userId)
    const students = await registerStudent.find({userId});
 

    if(!students){
      return res.status(404).json({
        status: true,
        message: "students not registered.",
        students,
      });
    }

    return res.status(200).json({
      status: true,
      message: "All registered students fetched successfully.",
      students,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to fetch students.",
      error,
    });
  }
};


// fetch all student regiter



const getAllStudents = async (req, res) => {
  try {
    const students = await registerStudent.find()

    if (students.length === 0) {
      return res.status(404).json({
        status: false,
        message: "not founded student",
      });
    }

    return res.status(201).json({
      status: true,
      message: "student found success ful",
      data: students,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "not aplicable found user",
      error,
    });
  }
};







module.exports={newRegisterStudent,getRegisterStudents   , getAllStudents}


