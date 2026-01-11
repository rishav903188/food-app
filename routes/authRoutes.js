const express = require("express");
const {
  registerController,
  loginController,
  getProfileController,
} = require("../controllers/authControllers");
const { requireSignIn } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

// 🔐 PROFILE ROUTE (LEVEL 1 COMPLETE)
router.get("/me", requireSignIn, getProfileController);

module.exports = router;
