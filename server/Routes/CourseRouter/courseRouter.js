const express = require("express");
const { addCourse, fetchCourses, deleteCourses } = require("../../Controllers/CourseController/courseController");
const authMiddleware = require("../../middleware/auth/auth");
const upload = require("../../middleware/multer/uploadMiddleware");
const singleCourseFind = require("../../Controllers/CourseController/singleCourseFind");

const courseRouter = express.Router();

courseRouter.post("/add/course",authMiddleware, upload.single("image"), addCourse); 

courseRouter.get("/find/course", fetchCourses);


courseRouter.delete("/delete/course/:id",authMiddleware, deleteCourses)


courseRouter.get("/single/course/fetch/:id", singleCourseFind)

module.exports = courseRouter;
