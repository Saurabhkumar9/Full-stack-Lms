const bcript = require("bcryptjs");
const User = require("../../Models/UserModels/user.model");
const jwt = require('jsonwebtoken');
require("dotenv").config()

// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.json({
//         status: 400,
//         message: "all field required",
//       });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.json({
//         status: 404,
//         message: "user not exist please signup.",
//       });
//     }

//     const isMatch = await bcript.compare(password, user.password);
//     if (!isMatch) {
//       return res.json({
//         status: 404,
//         message: "password invaild enter valid passeord.",
//       });
//     }

//     const key=process.env.JWT_SECRET
//     const token=jwt.sign({Id:user._id, userName:user.name}, key, {expiresIn:"2d"})
//     res.json({
//       status: 201,
//       message: "user login successfull.",
//       userName: user.name,
//       userEmail: user.email,
//       token
//     });
//   } catch (error) {
//     return res.json({
//       status: 505,
//       message: "sarver not work.",
//       error,
//     });
//   }
// };

// module.exports=loginUser



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
    const token = jwt.sign({ id: user._id, userName: user.name }, key, { expiresIn: "2d" }); // Use 'id' instead of 'Id'

    res.json({
      status: 201,
      message: "User login successful.",
      userName: user.name,
      userEmail: user.email,
      token
    });
  } catch (error) {
    return res.json({
      status: 505,
      message: "Server error.",
      error,
    });
  }
};

module.exports = loginUser;
