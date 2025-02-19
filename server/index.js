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
// databased connection
dbConnection();

// user router manages
app.use("/api", userRouter);

// course router manange

app.use("/api", courseRouter);


// lesson router

app.use("/api", lessonRouter)



// buy router


app.use('/api',buyRouter)

const PORT = process.env.PORT || 3306;

app.listen(PORT, () => {
  console.log(`app listen this port ${PORT}`);
});
