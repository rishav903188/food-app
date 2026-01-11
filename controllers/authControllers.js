// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const userModel = require("../models/userModel");

// const registerController = async (req, res) => {
//   try {
//     const { userName, email, password, phone, address } = req.body;

//     if (!userName || !email || !password || !phone || !address) {
//       return res.status(400).json({
//         success: false,
//         message: "please provide all fields",
//       });
//     }

//     const existing = await userModel.findOne({ email });
//     if (existing) {
//       return res.status(409).json({
//         success: false,
//         message: "user already exists",
//       });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await userModel.create({
//       userName,
//       email,
//       password: hashedPassword,
//       phone,
//       address,
//     });

//     return res.status(201).send({
//       success: true,
//       message: "user registered successfully",
//       user,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "Error in register api",
//     });
//   }
// };

// // ✅ LOGIN CONTROLLER (simple & working)
// const loginController = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // validation
//     if (!email || !password) {
//       return res.status(400).send({
//         success: false,
//         message: "please provide email and password",
//       });
//     }

//     // check user
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.status(404).send({
//         success: false,
//         message: "user not found",
//       });
//     }

//     // 🔐 COMPARE PASSWORD
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).send({
//         success: false,
//         message: "invalid credentials",
//       });
//     }

//     // 🔐 GENERATE TOKEN
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     return res.status(200).send({
//       success: true,
//       message: "login successful",
//       token,
//       user,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "Error in login api",
//     });
//   }
// };

// module.exports = { registerController, loginController };



const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

/**
 * REGISTER CONTROLLER
 */
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address } = req.body;

    // basic validation
    if (!userName || !email || !password || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields",
      });
    }

    // check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    // remove password from response
    user.password = undefined;

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in register API",
    });
  }
};

/**
 * LOGIN CONTROLLER
 */
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // remove password from response
    user.password = undefined;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in login API",
    });
  }
};
// GET PROFILE CONTROLLER
const getProfileController = async (req, res) => {
  try {
    // id JWT se aa rahi hai (middleware se)
    const userId = req.user.id;

    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in profile api",
    });
  }
};


module.exports = {
  registerController,
  loginController,
  getProfileController,
};
