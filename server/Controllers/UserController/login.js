const User = require("../../Models/UserModels/user.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User does not exist, please signup.",
        redirectUrl: "/",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password, please enter a valid password.",
        redirectUrl: "/",
      });
    }

    const key = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user._id, userName: user.name }, key, {
      expiresIn: "2d",
    });

    res.status(200).json({
      message: "User login successful.",
      userName: user.name,
      userEmail: user.email,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error.",
      error: error.message,
      redirectUrl: "/",
    });
  }
};



const updatePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password)

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
    // const hashedPassword=password

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

module.exports = { loginUser, updatePassword };
