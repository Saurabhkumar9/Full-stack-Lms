const express = require("express");
const addLesson = require("../../Controllers/LessonController/lessonAddController");
const upload = require("../../middleware/multer/uploadVideomiddleware");
const authMiddleware = require("../../middleware/auth/auth");
const {fetchLesson, deleteLessons} = require("../../Controllers/LessonController/lessonController");




const lessonRouter = express.Router();

lessonRouter.post("/lesson/add",authMiddleware, upload.single("video"), addLesson)

lessonRouter.get("/lesson/fetch/:courseId", fetchLesson)

lessonRouter.delete("/lesson/delete/:id",authMiddleware, deleteLessons)



module.exports = lessonRouter;
