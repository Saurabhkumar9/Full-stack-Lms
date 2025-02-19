const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "user", 
    required: true },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    required: true,
  },
  purchasedAt: { type: Date, default: Date.now },
});

const PurchasedCourse = mongoose.model("PurchasedCourse", Schema);
module.exports=PurchasedCourse
