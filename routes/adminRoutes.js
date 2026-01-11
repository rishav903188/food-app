const express = require("express");
const { requireSignIn } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/adminMiddleware");
const { getAllUsersController } = require("../controllers/adminControllers");

const router = express.Router();

// ADMIN ONLY ROUTE
router.get("/users", requireSignIn, isAdmin, getAllUsersController);

module.exports = router;
