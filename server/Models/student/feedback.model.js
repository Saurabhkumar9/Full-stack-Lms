const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  message: {
    type: String,
    require: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
}, {timestamps:true});

const feedbackModel=mongoose.model("userFeedback", Schema)

module.exports=feedbackModel
