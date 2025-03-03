const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbConnection = require("./Db/db");
const userRouter = require("./Routes/UserRouter/userRouter");
const courseRouter = require("./Routes/CourseRouter/courseRouter");
const lessonRouter = require("./Routes/LessonRouter/lessonRouter");
const buyRouter = require("./Routes/Students/buyRouter");
// const buyCourse = require("./Controllers/students/buycourse");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads/"));

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Something went wrong" });
});

dbConnection();

// user router manages
app.use("/api", userRouter);

// course router manange

app.use("/api", courseRouter);

// lesson router

app.use("/api", lessonRouter);

// buy router

app.use("/api", buyRouter);

const PORT = process.env.PORT || 3306;

app.listen(PORT, () => {
  console.log(`app listen this port ${PORT}`);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  server.close(() => {
    console.log("Shutting down server due to Uncaught Exception");
    process.exit(1);
  });
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
  server.close(() => {
    console.log("Shutting down server due to Unhandled Promise Rejection");
    process.exit(1);
  });
});
