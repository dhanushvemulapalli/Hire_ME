const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const User = require("../models/User"); // assuming you have a User model

router.post("/", auth, async (req, res) => {
  try {
    // get user by ID
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // update fields
    const { name, bio, skills } = req.body;
    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.skills = skills || user.skills;

    await user.save();
    res.json({ msg: "Profile updated successfully!", user });
  } catch (err) {
    console.error("❌ Error in profile route:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
