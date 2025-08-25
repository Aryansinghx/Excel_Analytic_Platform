// routes/admin.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");

// middleware
const adminAuth = require("../middleware/auth");

// ✅ GET all users (admin only)
router.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ count: users.length, users });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ DELETE a user (admin only)
router.delete("/users/:id", adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Basic stats (admin only)
router.get("/stats", adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.json({ totalUsers });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
