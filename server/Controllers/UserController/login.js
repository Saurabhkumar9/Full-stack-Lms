const bcript = require("bcryptjs");
const User = require("../../Models/UserModels/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        status: 400,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        status: 404,
        message: "User does not exist, please signup.",
      });
    }

    const isMatch = await bcript.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        status: 404,
        message: "Invalid password, please enter a valid password.",
      });
    }

    const key = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user._id, userName: user.name }, key, {
      expiresIn: "2d",
    }); // Use 'id' instead of 'Id'

    res.json({
      status: 201,
      message: "User login successful.",
      userName: user.name,
      userEmail: user.email,
      token,
    });
  } catch (error) {
    return res.json({
      status: 505,
      message: "Server error.",
      error,
    });
  }
};








const updatePassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password.",
      });
    }

 
    const existUser = await User.findOne({ email });

    if (!existUser) {
      return res.status(404).json({
        success: false,
        message: "Email does not exist. Please create an account.",
      });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

    
    await User.findByIdAndUpdate(existUser._id, { password: hashedPassword });

    return res.status(200).json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message,
    });
  }
};














module.exports = {loginUser, updatePassword}
