const User = require("../../Models/UserModels/user.model");
const bcrypt = require("bcryptjs");

const signupUser = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    if (!name || !email || !role || !password) {
      return res.status(404).json({
        message: "all field required",
      });
    }

    const user = await User.findOne({ email });
   

    if (user) {
      return res.status(404).json({
        message: "email already exist. please login.",
      });
    }

    const hashpass = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      role,
      password: hashpass,
    });
    await newUser.save();
    return res.status(201).json({
      status: "ok",
      message: "user signup successful.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error occurred",
      error: error.message,
    });
  }
};
module.exports = signupUser;
