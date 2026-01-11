const userModel = require("../models/userModel");

// GET ALL USERS (ADMIN ONLY)
const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");

    return res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in admin users api",
    });
  }
};

module.exports = { getAllUsersController };
