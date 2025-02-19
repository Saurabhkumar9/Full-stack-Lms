const express = require("express");
const authMiddleware = require("../../middleware/auth/auth");
const buyCourse = require("../../Controllers/students/buycourse");
const getPurchasedCourses = require("../../Controllers/students/getCourse");
const {
  newRegisterStudent,
  getRegisterStudents,
  getAllStudents,
} = require("../../Controllers/students/studentRegister");
const upload = require("../../middleware/multer/uploadMiddleware");
const {
  sendFeedback,
  feedbackShow,
  ContectUser,
  deleteFeedback,
  showAllContacts,
  deleteContact,
} = require("../../Controllers/students/feedbackController");

const buyRouter = express.Router();

// Route for buying a course
buyRouter.post("/buy-course", authMiddleware, buyCourse);

// Route for getting the purchased courses of the user
buyRouter.get("/get/course", authMiddleware, getPurchasedCourses);

// student register

buyRouter.post(
  "/student/register",
  authMiddleware,
  upload.single("image"),
  newRegisterStudent
);

buyRouter.get("/student/get", authMiddleware, getRegisterStudents);


buyRouter.get("/get/all/register/student", getAllStudents)

// feedback router  

buyRouter.post("/send/feedback", authMiddleware, sendFeedback);

// feedback show
buyRouter.get("/show/feedback", feedbackShow);

// feedback delete

buyRouter.delete("/delete/feedback/:id", deleteFeedback)

// contect router 
buyRouter.post("/user/contect",authMiddleware, ContectUser)

buyRouter.get("/show/contact", showAllContacts);


buyRouter.delete("/delete/contact/:id", deleteContact);


module.exports = buyRouter;
