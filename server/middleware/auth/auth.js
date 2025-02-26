const jwt = require("jsonwebtoken");
const User = require("../../Models/UserModels/user.model");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized access not allowed",
      });
    }

    const token = authHeader.split(" ")[1];
    // console.log(token);

    const key = process.env.JWT_SECRET;

    const decodedToken = jwt.verify(token, key);
    // console.log("Decoded Token:", decodedToken);


    // Corrected from decodedToken.Id to decodedToken.id
    const user = await User.findById(decodedToken.id); 

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found!",
      });
    }

    req.user = { id: user._id };
    next();
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "only login person access data. first login",
      error: error.message,
    });
  }
};

module.exports = authMiddleware;

